const secret = process.env.JWTSECRET;

export const checkJWT = async (req, res, next) => {
  try {
    var decoded = jwt.verify(token, secret);
    console.log(decoded); // bar

    console.log("auth middleware");
    console.log(req.body);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "request err" });
  }
};
