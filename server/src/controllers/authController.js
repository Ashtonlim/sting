export const register = async (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "auth register user route" });
};

export const login = async (req, res) => {
  res.status(200).json({ message: "auth register user route" });
};
