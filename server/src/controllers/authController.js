import { createUser, findAll, findById } from "../models/authModel.js";
import jwt from "jsonwebtoken";
import { isAlphaNumeric } from "../utils.js";
import bcrypt from "bcryptjs";

const secret = process.env.JWTSECRET;

if (!secret) {
  console.log("secret not found");
}

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

export const register = async (req, res) => {
  try {
    const { success, data, err } = await createUser(req.body);

    const user = data;
    const token = jwt.sign({ username: data.username }, secret, {
      expiresIn: "1h",
    });

    if (!success) {
      return res.status(401).json(err);
    }

    res.status(200).json({ data: { token, user } });
  } catch (err) {
    res.status(500).json(err);
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
