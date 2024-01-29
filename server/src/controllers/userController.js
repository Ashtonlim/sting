import { findAll } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const { success, data, err } = await findAll(req.body);

    if (!success) {
      res.status(401).json(err);
    }
    const user = data;
    console.log("user", user);
    const token = jwt.sign({ id: user.username }, secret, { expiresIn: "1h" });
    console.log(token);
    res.status(200).json({ data: { token, user } });
  } catch (err) {
    res.status(500).json(err);
  }
};
