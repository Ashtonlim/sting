import jwt from "jsonwebtoken";
const secret = process.env.JWTSECRET;

export const checkJWT = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  const token2 = req.headers["authorization"];
  console.log(token);
  console.log(token2);
  try {
    var decoded = jwt.verify(token, secret);
    console.log(decoded); // bar

    console.log("auth middleware");
    console.log(req.body);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "invalid user credentials" });
  }
};
