import { findAll } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await findAll(req.body);

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
