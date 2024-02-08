import { findAll, findById, editUser } from "../models/userModel.js";

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
    // console.log("req.body", req.body);
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
    console.log(username, users);

    if (users.length !== 1) {
      return res.status(404).send("User not found");
    }

    // password will not be updated if not provided
    password = password
      ? bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      : users[0].password;

    console.log(secGrp, "secGrp");

    secGrp = secGrp ? secGrp.join(",") : secGrp;

    // console.log({ username, password, email, isActive, secGrp });
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
    const { password, email } = req.body;

    // get which user is requesting
    const username = req.byUser;

    const user = await findById(username);

    // update user
    const res = await updateUser(username, password, email);

    const token = jwt.sign({ username }, secret, { expiresIn: 60 * 60 });
    res.cookie("jwt", token, { maxAge: 3600000 });
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
