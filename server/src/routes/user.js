import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";
import { checkJWT, isAdmin } from "../middlewares/auth.js";
import { adminUpdateUser, updateUser } from "../controllers/userController.js";

const router = Router();

router.get("/allUsers", checkJWT, getAllUsers);
router.post("/admin/updateUser", checkJWT, isAdmin, adminUpdateUser);
router.post("/updateUser", checkJWT, updateUser);

export default router;
