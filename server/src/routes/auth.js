import { Router } from "express";
import { register, login, reset } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get("/reset/123", reset);
router.post("/register", register);
router.post("/login", login);

export default router;
