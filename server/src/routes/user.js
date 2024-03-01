import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/userController.js";
import { checkAuth } from "../middlewares/auth.js";
import { adminUpdateUser, updateUser } from "../controllers/userController.js";

const router = Router();

router.get("/allUsers", checkAuth, getAllUsers);
router.get("/user", checkAuth, getUser);
router.post("/admin/updateUser", checkAuth, adminUpdateUser);
router.post("/updateUser", checkAuth, updateUser);

export default router;
