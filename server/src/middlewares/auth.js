import sql from "../models/db.js";
import jwt from "jsonwebtoken";
const secret = process.env.JWTSECRET;

export const checkAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  jwt.verify(token, secret, async (err, decode) => {
    console.log("decode", decode);
    const { username } = decode;
    // console.log(decoded); // { username: 'admin', iat: 1707118235, exp: 1707121835 }
    if (err) {
      return res.status(403).send("Invalid token");
    }

    try {
      const getUserByIdQry = `SELECT * FROM accounts WHERE username='${username}';`;
      const [users] = await sql.query(getUserByIdQry);
      console.log("auth", users);
      if (users.length !== 1) {
        return res
          .status(401)
          .json({ err: "No such user", loggedIn: false, isAdmin: false });
      }

      const user = users[0];
      req.byUser = username;
      req.secGroups = [];
      req.isAdmin = false;

      const secGroups = user["secGrp"];
      if (secGroups !== null || typeof secGroups === "string") {
        req.secGroups = secGroups.split(",");
        req.isAdmin = req.secGroups.includes("admin");
      }

      next();
    } catch (err) {
      throw new Error(err);
    }
  });
};
