import { createUser, findById } from "../models/userModel.js";
import secGroups from "../models/secGroups.js";
import jwt from "jsonwebtoken";
import { isAlphaNumeric } from "../utils.js";
import bcrypt from "bcryptjs";

const secret = process.env.JWTSECRET;
const expiresIn = "1h";
// if (!secret) {
//   console.log("WARNING: Secret for JWT not found");
//   throw new Error("Secret for JWT not found");
// }

// From spec sheet:
// create a function that returns a value to indicate if a user is in a group.

export const Checkgroup = async (userid, groupname) => {
  try {
    const users = await findById(userid);
    if (users.length !== 1) {
      console.log(users, "user not found");
      return false;
    }
    return users[0]["secGrp"].split(",").includes(groupname);
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

// const groupsValidation = async () => {

// }

export const register = async (req, res) => {
  try {
    const { username, password, email, groups } = req.body;

    // check submitted JWT is a valid admin
    const isAdmin = await Checkgroup(req.byUser, "admin");

    if (!isAdmin) {
      return res.status(401).json("User is not an admin.");
    }

    // verify fits constraints
    const meetsContraints =
      isAlphaNumeric(username) && username.length >= 3 && username.length <= 20;

    if (!meetsContraints) {
      return res.status(401).json("Invalid user details.");
    }

    // verify groups are valid
    const allSecGroups = await secGroups.findAll();
    const secGroupsSet = new Set(allSecGroups.map((row) => row.groupname));

    let invalidGrps = "";
    for (const grp of groups) {
      if (!secGroupsSet.has(grp)) {
        invalidGrps += grp;
      }
    }

    if (invalidGrps) {
      return res
        .status(401)
        .json(`${invalidGrps} group does not exists, please create them first`);
    }

    // find if user already exists
    let user = await findById(username);

    // reject if user already exists
    if (user.length >= 1) {
      return res.status(401).json("User already exists");
    }

    // create hash
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    user = await createUser({
      ...req.body,
      password: hash,
      groups: groups.join(","),
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
      return res.status(401).json({ err: "No such user" });
    }

    // user should not be able to login if isActive is false
    if (!users[0].isActive) {
      return res.status(401).json({ err: "User is disabled" });
    }

    const isPwdCorrect = bcrypt.compareSync(password, users[0].password);
    if (!isPwdCorrect) {
      return res.status(401).json({ err: "incorrect password" });
    }

    const token = jwt.sign({ username }, secret, { expiresIn: 60 * 60 });
    res.cookie("jwt", token, {
      // httpOnly: true, // cannot access cookie via js in client
      // secure: true, // Only sent over HTTPS
      maxAge: 3600000, // expiration milliseconds
      // sameSite: "strict", // Restricts the cookie to be sent only with requests originating from the same site
    });

    res.status(200).json({ data: users[0].username });
  } catch (err) {
    res.status(500).json(err);
  }
};
