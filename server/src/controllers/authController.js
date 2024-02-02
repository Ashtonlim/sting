import { createUser, findAll, findById } from "../models/authModel.js";
import jwt from "jsonwebtoken";
import { isAlphaNumeric } from "../utils.js";
import bcrypt from "bcryptjs";

const secret = process.env.JWTSECRET;
const expiresIn = "1h";
// if (!secret) {
//   console.log("WARNING: Secret for JWT not found");
//   throw new Error("Secret for JWT not found");
// }

export const Checkgroup = async (userid, groupname) => {
  try {
    const user = findById(userid);
    return user.secGrp.split(",").includes(groupname);
  } catch (err) {
    throw new Error(err);
  }
};

export const verifyAccessGrp = async (req, res) => {
  try {
    const { userid, groupname } = req.body;
    const userIsInGroup = await Checkgroup(userid, groupname);
    return res.status(200).json({ success: true, userIsInGroup });
  } catch (err) {
    res.status(500).json(err);
  }
};

// review: not tested yet
export const register = async (req, res) => {
  req.body = { username, password, email }; // user to create
  // verify fits constraints
  // isAlphaNumeric(username);

  try {
    // check submitted JWT is a valid admin, prob in middleware jwt check
    const { adminUsername } = req.body;
    const isAdmin = await Checkgroup(adminUsername, "admin");

    if (!isAdmin) {
      return { success: false, err: "user is not an admin" };
    }

    let user = findById(username);

    // 2. reject if user already exists
    if (user.length === 1) {
      const error = new Error("User already exists");
      error.code = 400;
      throw error;
    }

    // 3. create hash
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    user = createUser({ username, password: hash, email });
    const token = jwt.sign({ username }, secret, { expiresIn });

    if (!token || !user) {
      return res
        .status(401)
        .json({ success: false, err: "failed to create user" });
    }

    res.status(200).json({ data: { token, user } });
  } catch (err) {
    if (err.code === 400) {
      res.status(500).json(err);
    } else {
      res.status(500).json(err);
    }
  }
};

export const login = async (req, res) => {
  // console.log(req.body);
  const { username, password } = req.body;
  const meetsContraints = isAlphaNumeric(username);

  if (!meetsContraints) {
    return res
      .status(401)
      .json({ success: false, err: "username does not meet constraints" });
  }

  try {
    const user = await findById(username);
    // console.log(user);

    // user.password is hash
    const isPwdCorrect = bcrypt.compareSync(password, user.password);
    if (!isPwdCorrect) {
      return res
        .status(401)
        .json({ success: false, err: "incorrect password" });
    }

    const token = jwt.sign({ username }, secret, { expiresIn: 60 * 60 });
    res.cookie("jwt", token, {
      // httpOnly: true, // cannot access cookie via js in client
      // secure: true, // Only sent over HTTPS
      maxAge: 3600000, // expiration milliseconds
      // sameSite: "strict", // Restricts the cookie to be sent only with requests originating from the same site
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// export const reset = async (req, res) => {
//   console.log("attempting to reset db");
//   const resetSuccess = await resetDB();
//   if (resetSuccess) {
//     console.log("db has been reset");
//   }
// };
