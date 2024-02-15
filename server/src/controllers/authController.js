import { createUser, findById } from "../models/userModel.js";
import { sg_findAll } from "../models/secGroups.js";
import jwt from "jsonwebtoken";
import { isAlphaNumeric } from "../utils.js";
import bcrypt from "bcryptjs";
import sql from "../models/db.js";

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
    const users = await findById(userid);
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
    const meetsContraints =
      isAlphaNumeric(username) && username.length >= 3 && username.length <= 20;

    if (!meetsContraints) {
      return res.status(401).json("Invalid user details.");
    }
    // find if user already exists
    let user = await findById(username);

    // reject if user already exists
    if (user.length >= 1) {
      return res.status(401).json("User already exists");
    }

    // ==== check username ====

    // ==== check password ====

    // create hash
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    // ==== check password ====

    // ==== check email ====
    if (typeof email !== "string") {
      console.log("change email to empty str");
      email = null;
    } else {
      const checkIfEmailExistsQry = `SELECT * from accounts where email='${email}'`;
      console.log(checkIfEmailExistsQry);
      const [usersWithEmail] = await sql.query(checkIfEmailExistsQry);
      console.log(usersWithEmail);
      if (usersWithEmail > 0) {
        return res.status(401).json("Email already in use");
      }
    }

    // ==== check email ====

    // ==== check groups ====
    if (!Array.isArray(groups)) {
      console.log("change groups to empty arr");
      groups = null;
    }

    // if items provided
    if (groups) {
      // verify groups are valid
      const allSecGroups = (await sg_findAll()).map((row) => row.groupname);
      const secGroupsSet = new Set(allSecGroups);

      console.log(secGroupsSet);

      let invalidGrps = groups.filter((grp) => !secGroupsSet.has(grp));
      console.log(invalidGrps, "invalidGrps");

      if (invalidGrps.length > 0) {
        return res
          .status(401)
          .json(
            `${invalidGrps} group does not exists, please create them first`
          );
      }
    }
    // ==== check groups ====

    user = await createUser({
      username,
      password: hash,
      email,
      groups: groups?.join(","),
    });

    const token = jwt.sign({ username }, secret, { expiresIn });

    if (!token || !user) {
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
    // user.password is hash
    const users = await findById(username);

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
