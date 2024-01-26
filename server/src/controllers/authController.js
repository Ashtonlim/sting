import { adminCreateUser, loginUser, resetDB } from "../models/authModel.js";

export const register = async (req, res) => {
  const dbRes = adminCreateUser(req.body);
  res.status(200).json({ message: "auth register user route" });
};

export const login = async (req, res) => {
  try {
    const { success, data, err } = await loginUser(req.body);
    // console.log(success, data, err);

    if (!success) {
      res.status(401).json({ err });
    }
    res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

export const reset = async (req, res) => {
  console.log("attempting to reset db");
  const resetSuccess = await resetDB();
  if (resetSuccess) {
    console.log("db has been reset");
  }
};
