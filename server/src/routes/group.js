import { Router } from "express";
import { getAllGroups, createGroup } from "../controllers/groupController.js";
import { checkAuth } from "../middlewares/auth.js";

const router = Router();

router.get("/allGroups", checkAuth, getAllGroups);
router.post("/createGroup", checkAuth, createGroup);

export default router;
