import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/usersaa", checkJWT, getAllUsers);

export default router;
