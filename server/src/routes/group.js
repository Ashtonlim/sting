import { Router } from "express";
import { getAllGroups, createGroup } from "../controllers/groupController.js";

const router = Router();

router.get("/allGroups", getAllGroups);
router.post("/createGroup", createGroup);

export default router;
