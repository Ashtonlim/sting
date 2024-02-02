import { Router } from "express";
import {
  register,
  login,
  verifyAccessGrp,
} from "../controllers/authController.js";
import { checkJWT } from "../middlewares/auth.js";

const router = Router();

// router.get("/reset/123", reset);
router.post("/register", checkJWT, register);
router.post("/login", login);
router.post("/verifyAccessGrp", verifyAccessGrp);

export default router;
