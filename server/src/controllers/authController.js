import { createUser, loginUser, resetDB } from "../models/authModel.js";
import jwt from "jsonwebtoken";

const secret = process.env.JWTSECRET;

if (!secret) {
  console.log("secret not found");
}

export const register = async (req, res) => {
  try {
    const { success, data, err } = await createUser(req.body);

    const user = data;
    const token = jwt.sign({ username: data.username }, secret, {
      expiresIn: "1h",
    });

    if (!success) {
      return res.status(401).json(err);
    }

    res.status(200).json({ data: { token, user } });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const { success, data, err } = await loginUser(req.body);
    // console.log(success, data, err);

    if (!success) {
      return res.status(401).json(err);
    }
    const user = data;
    const token = jwt.sign({ username: user.username }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({ data: { token, user } });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const reset = async (req, res) => {
  console.log("attempting to reset db");
  const resetSuccess = await resetDB();
  if (resetSuccess) {
    console.log("db has been reset");
  }
};
