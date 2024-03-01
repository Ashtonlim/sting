import sql from "../config/db.js";
import jwt from "jsonwebtoken";
const secret = process.env.JWTSECRET;

export const checkAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token || token === "undefined") {
    return res
      .status(200)
      .json({ err: "Lacking a JWT", loggedIn: false, isAdmin: false });
  }

  jwt.verify(token, secret, async (err, decode) => {
    console.log(decode);
    if (!decode) {
      return res.status(200).json({
        err: "Could not decode JWT. Possible issues include: timeout, etc.",
        loggedIn: false,
        isAdmin: false,
      });
    }
    const { username } = decode;
    // console.log(decoded); // { username: 'admin', iat: 1707118235, exp: 1707121835 }
    if (err) {
      return res.status(403).send("Invalid token");
    }

    try {
      const getUserByIdQry = `SELECT * FROM accounts WHERE username='${username}';`;
      const [users] = await sql.query(getUserByIdQry);
      if (users.length !== 1) {
        return res.status(401).json({
          err: "no such user associated with JWT",
          loggedIn: false,
          isAdmin: false,
        });
      }

      const user = users[0];
      req.byUser = username;
      req.secGrp = [];
      req.isAdmin = false;

      const secGrp = user["secGrp"];
      if (secGrp !== null || typeof secGrp === "string") {
        req.secGrp = secGrp.split(",");
        req.isAdmin = req.secGrp.includes("admin");
      }

      next();
    } catch (err) {
      throw new Error(err);
    }
  });
};
