import jwt from "jsonwebtoken";
import { findById } from "../models/authModel.js";
const secret = process.env.JWTSECRET;

export const checkJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, secret, async (jwtErr, decoded) => {
    // console.log(decoded); // { username: 'admin', iat: 1707118235, exp: 1707121835 }
    if (jwtErr) {
      return res.status(403).send("Invalid token");
    }

    try {
      const users = await findById(decoded.username);

      if (users.length !== 1) {
        return res.status(401).json({ err: "No such user" });
      }

      req.byUser = users[0];
      next();
    } catch (err) {
      console.log(err);
    }
  });
};
