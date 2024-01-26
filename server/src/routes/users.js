import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";

const router = Router();

router.use("/auth", getAllUsers);

export default router;
