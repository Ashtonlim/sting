import { Router } from "express";
import { register, login, reset } from "../controllers/authController.js";

const router = Router();
router.get("/", (req, res) => {
  res.send({ message: "auth route" });
});

router.get("/reset/123", reset);
router.post("/register", register);
router.post("/login", login);

export default router;
