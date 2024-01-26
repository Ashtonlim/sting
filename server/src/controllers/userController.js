import { adminCreateUser } from "../models/authModel.js";

export const getAllUsers = async (req, res) => {
  console.log(req.body);
  const dbRes = adminCreateUser(req.body);
  res.status(200).json({ message: "auth register user route" });
};
