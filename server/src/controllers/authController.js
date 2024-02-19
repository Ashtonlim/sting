import jwt from "jsonwebtoken";
import { isAlphaNumeric } from "../utils.js";
import bcrypt from "bcryptjs";
import sql from "../config/db.js";

const secret = process.env.JWTSECRET;
const expiresIn = "1h";
// if (!secret) {
//   console.log("WARNING: Secret for JWT not found");
//   throw new Error("Secret for JWT not found");
// }

// From spec sheet:
// create a function that returns a value to indicate if a user is in a group.

export const Checkgroup = async (userid, groupname) => {
  // console.log(userid, groupname, "userid, groupname");
  try {
    const getUserByIdQry = `SELECT * FROM accounts WHERE username='${userid}';`;
    const [users] = await sql.query(getUserByIdQry);

    if (users.length !== 1) {
      console.log(users, "user not found");
      return false;
    }
    const secGroups = users[0]["secGrp"];
    if (secGroups === null || typeof secGroups !== "string") {
      return false;
    }

    return secGroups.split(",").includes(groupname);
  } catch (err) {
    throw new Error(err);
  }
};

export const verifyAccessGrp = async (req, res) => {
  try {
    const { groupname } = req.body;

    if (!groupname) {
      return res.status(401).json("no groupname provided");
    }

    return res
      .status(200)
      .json({ isAdmin: await Checkgroup(req.byUser, groupname) });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const register = async (req, res) => {
  try {
    let { username, password, email, groups } = req.body;
    console.log(username, password, email, groups);
    // check submitted JWT is a valid admin
    const isAdmin = await Checkgroup(req.byUser, "admin");

    if (!isAdmin) {
      return res.status(403).json("User is not an admin.");
    }

    // ==== check username ====
    // verify fits constraints
    const usernameMeetsContraints =
      new RegExp("^[a-zA-Z0-9]+$").test(username) &&
      username.length >= 3 &&
      username.length <= 20;

    if (!usernameMeetsContraints) {
      return res.status(401).json("Username is not valid");
    }

    // find if user already exists
    const getUserByIdQry = `SELECT * FROM accounts WHERE username='${username}';`;
    const [users] = await sql.query(getUserByIdQry);

    // reject if user already exists
    if (users.length >= 1) {
      return res.status(401).json("User already exists");
    }

    // ==== check password ====
    if (
      new RegExp(
        "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,10}$"
      ).test(password)
    ) {
      return res.status(401).json("password is not valid");
    }

    // create hash
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    // ==== check email ====
    if (typeof email !== "string") {
      console.log("change email to empty str");
      email = null;
    } else {
      const checkIfEmailExistsQry = `SELECT * from accounts where email='${email}';`;
      const [usersWithEmail] = await sql.query(checkIfEmailExistsQry);

      if (usersWithEmail.length > 0) {
        return res.status(401).json("Email already in use");
      }
    }

    // ==== check groups ====
    if (!Array.isArray(groups)) {
      console.log("change groups to empty arr");
      groups = null;
    }

    // if items provided
    if (groups) {
      // verify groups are valid
      const findAllQry = `SELECT * FROM secGroups;`;
      const [groups] = await sql.query(findAllQry);

      const allSecGroups = groups.map((row) => row.groupname);
      const secGroupsSet = new Set(allSecGroups);

      let invalidGrps = groups.filter((grp) => !secGroupsSet.has(grp));

      if (invalidGrps.length > 0) {
        return res
          .status(401)
          .json(
            `${invalidGrps} group(s) does not exists, please create them first`
          );
      }
    }

    groups = groups?.join(",");

    const createUserQry = `
      INSERT INTO accounts (username, password, email, secGrp) values ('${username}', '${password}', ${
      email ? email : null
    }, ${groups ? `'${groups}'` : null});
    `;
    const createdUser = await sql.query(createUserQry);
    const token = jwt.sign({ username }, secret, { expiresIn });

    if (!token || !createdUser) {
      return res.status(401).json("failed to create user");
    }

    res.status(200).json();
  } catch (err) {
    console.log(err, "error");
    res.status(500).json(err);
  }
};

// disable user from accessing group
// can just prevent user from logging in
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const getUserByIdQry = `SELECT * FROM accounts WHERE username='${username}';`;
    const [users] = await sql.query(getUserByIdQry);

    if (users.length !== 1) {
      return res.status(401).json("Invalid credentials");
    }

    // user should not be able to login if isActive is false
    if (!users[0].isActive) {
      return res.status(401).json("User is disabled");
    }

    const isPwdCorrect = bcrypt.compareSync(password, users[0].password);
    if (!isPwdCorrect) {
      return res.status(401).json("Invalid credentials");
    }

    const token = jwt.sign({ username }, secret, { expiresIn: 60 * 60 });
    res.cookie("jwt", token, {
      // httpOnly: true, // cannot access cookie via js in client
      // secure: true, // Only sent over HTTPS
      maxAge: 3600000, // expiration milliseconds
      // sameSite: "strict", // Restricts the cookie to be sent only with requests originating from the same site
    });

    res
      .status(200)
      .json({ username, isAdmin: await Checkgroup(username, "admin") });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
