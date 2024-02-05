import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";
import { checkJWT } from "../middlewares/auth.js";
const router = Router();

router.get("/allUsers", getAllUsers);
router.get("/usersaa", checkJWT, getAllUsers);

export default router;
