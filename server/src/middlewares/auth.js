import jwt from "jsonwebtoken";
import { findById } from "../models/authModel.js";
import { Checkgroup } from "../controllers/authController.js";
const secret = process.env.JWTSECRET;

export const checkJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, secret, async (err, decoded) => {
    // console.log(decoded); // { username: 'admin', iat: 1707118235, exp: 1707121835 }
    if (err) {
      return res.status(403).send("Invalid token");
    }

    req.byUser = decoded.username;
    next();
  });
};

export const isAdmin = async (req, res, next) => {
  const username = req.byUser;
  const isAdmin = Checkgroup(username, "admin");
  if (isAdmin) {
    next();
  }
  return res.status(403).send("User is not an admin");
};
