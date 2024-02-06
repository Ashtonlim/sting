import { Router } from "express";
import { getAllGroups, createGroup } from "../controllers/groupController.js";
import { checkJWT, isAdmin } from "../middlewares/auth.js";

const router = Router();

router.get("/allGroups", checkJWT, isAdmin, getAllGroups);
router.post("/createGroup", checkJWT, isAdmin, createGroup);

export default router;
