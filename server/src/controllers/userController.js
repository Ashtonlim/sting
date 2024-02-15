import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import sql from "../models/db.js";
import { findAll, findById, editUser } from "../models/userModel.js";

const secret = process.env.JWTSECRET;

export const getAllUsers = async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).send("User is not an admin");
  }

  try {
    const getUserByIdQry = `SELECT username, email, isActive, secGrp FROM accounts;`;
    const [users] = await sql.query(getUserByIdQry);

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const getUserByIdQry = `SELECT * FROM accounts WHERE username='${req.byUser}';`;
    const [users] = await sql.query(getUserByIdQry);
    if (users.length !== 1) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(users[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const adminUpdateUser = async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).send("User is not an admin");
  }
  try {
    let { username, password, email, isActive, secGrp } = req.body;

    // admin cannot be deleted, check if admin
    if (req.username === "admin" && (!isActive || !secGrp.includes("admin"))) {
      return res
        .status(403)
        .send(
          "User 'admin' can only change password and add or remove itself all groups except 'admin' group."
        );
    }

    const getUserByIdQry = `SELECT * FROM accounts WHERE username='${username}';`;
    const [users] = await sql.query(getUserByIdQry);

    if (users.length !== 1) {
      return res.status(404).send("User not found");
    }

    const setIntoQry = [];

    // password will not be updated if not provided
    if (
      new RegExp(
        "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,10}$"
      ).test(password)
    ) {
      setIntoQry.push(
        ` password=${bcrypt.hashSync(password, bcrypt.genSaltSync(10))}`
      );
    }

    if (typeof email === "string" && email !== "") {
      setIntoQry.push(` email='${email}'`);
    }

    setIntoQry.push(` isActive=${isActive ? 1 : 0}`);

    if (Array.isArray(secGrp) && secGrp.length > 0) {
      setIntoQry.push(` secGrp='${secGrp.join(",")}'`);
    }

    // update user
    const updateUserQry = `UPDATE accounts SET${setIntoQry.join(
      ","
    )} WHERE username='${username}';`;
    console.log("query is", updateUserQry);

    await sql.query(updateUserQry);
    res.status(200).json(`Updated user ${username}`);
  } catch (err) {
    res.status(500).json(err);
  }
};

// check this
export const updateUser = async (req, res) => {
  try {
    let { password, email } = req.body;

    if (!password && !email) {
      return res.status(400).send("No data to update");
    }

    // get which user is requesting
    const username = req.byUser;
    const getUserByIdQry = `SELECT * FROM accounts WHERE username='${username}';`;

    const [users] = await sql.query(getUserByIdQry);

    if (users.length !== 1) {
      return res.status(404).send("User not found");
    }

    // ==== check password ====
    const setIntoQry = [];
    let hash = "";
    if (typeof password === "string" && password !== "") {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      setIntoQry.push(` password='${hash}'`);
    }

    // ==== check email ====
    if (typeof email === "string" && email !== "") {
      setIntoQry.push(` email='${email}'`);
    }

    // update user
    const updateUserQry = `UPDATE accounts SET${setIntoQry.join(
      ","
    )} WHERE username='${username}';`;

    console.log("query is", updateUserQry);
    const updatedUser = await sql.query(updateUserQry);

    const token = jwt.sign({ username }, secret, { expiresIn: 60 * 60 });
    res.cookie("jwt", token, { maxAge: 3600000 });
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
