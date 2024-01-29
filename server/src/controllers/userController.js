import { findAll } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const { success, data, err } = await findAll(req.body);

    if (!success) {
      res.status(401).json(err);
    }

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json(err);
  }
};
