export const authMiddleware = async (req, res, next) => {
  try {
    console.log("auth middleware");
    console.log(req.body);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "request err" });
  }
};
