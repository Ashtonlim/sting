import { Router } from "express";
import { getAllGroups } from "../controllers/groupController.js";

const router = Router();

router.get("/allGroups", getAllGroups);

export default router;
