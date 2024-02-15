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
    const users = await findAll();

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getUser = async (req, res) => {
  console.log(req.byUser);
  const getUserByIdQry = `SELECT * FROM accounts WHERE username='${req.byUser}';`;

  try {
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
    if (
      req.username === "admin" &&
      (isActive === false || !secGrp.includes("admin"))
    ) {
      return res
        .status(403)
        .send(
          "User 'admin' can only change password and add or remove itself all groups except 'admin' group."
        );
    }

    const users = await findById(username);

    if (users.length !== 1) {
      return res.status(404).send("User not found");
    }

    // password will not be updated if not provided
    password = password
      ? bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      : users[0].password;

    secGrp = secGrp ? secGrp.join(",") : secGrp;

    // update user
    await editUser({
      username,
      password,
      email,
      isActive,
      secGrp,
    });

    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// check this
export const updateUser = async (req, res) => {
  try {
    // admin cannot be deleted, check if admin
    let { password, email } = req.body;
    // get which user is requesting
    const username = req.byUser;
    const user = await findById(username);

    if (user.length !== 1) {
      return res.status(404).send("User not found");
    }

    if (!password && !email) {
      return res.status(400).send("No data to update");
    }
    // ==== check password ====
    if (typeof password !== "string") {
      console.log("change password to empty str");
      password = null;
    }

    if (password) {
      // create hash
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
    }

    // ==== check password ====
    console.log(email, typeof email !== "string");
    // ==== check email ====
    if (typeof email !== "string") {
      console.log("change email to empty str");
      email = null;
    }
    // ==== check email ====
    console.log("password", password, "email", email);
    // update user
    const updateUserQry = `UPDATE accounts SET ${
      password ? `password='${hash}', ` : ""
    }${email ? `email='${email}' ` : ""}WHERE username='${username}';`;

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
