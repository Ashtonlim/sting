import { findAll, findById } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await findAll();

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const adminUpdateUser = async (req, res) => {
  try {
    let { username, password, email, isActive, secGrp } = req.body;

    console.log(req.body);

    // admin cannot be deleted, check if admin
    if (username === "admin" && isActive === false) {
      return res.status(403).send("'admin' user cannot be deactivated");
    }

    const user = await findById(username);

    // password will not be updated if not provided
    password = password ? password : user.password;

    // update user
    const res = await updateUser({
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
    const { password, email } = req.body;

    // get which user is requesting
    const username = req.byUser;

    const user = await findById(username);

    // update user
    const res = await updateUser(user);

    const token = jwt.sign({ username }, secret, { expiresIn: 60 * 60 });
    res.cookie("jwt", token, { maxAge: 3600000 });
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
