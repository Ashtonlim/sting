import { adminCreateUser, loginUser, resetDB } from "../models/authModel.js";

export const register = async (req, res) => {
  console.log(req.body);
  const dbRes = adminCreateUser(req.body);
  res.status(200).json({ message: "auth register user route" });
};

export const login = async (req, res) => {
  console.log(req.body);
  try {
    const userData = await loginUser(req.body);
    if (userData) {
      console.log(userData);
      return res
        .status(200)
        .json({ message: "auth login user route", userData });
    }
  } catch (err) {
    console.log("login err:", err);
    return err;
  }
};

export const reset = async (req, res) => {
  console.log("attempting to reset db");
  const resetSuccess = await resetDB();
  if (resetSuccess) {
    console.log("db has been reset");
  }
};
