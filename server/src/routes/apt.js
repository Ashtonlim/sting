import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";
import {
  getAllApps,
  getApp,
  getAllPlans,
  getAllTasks,
  createApp,
  editApp,
  createTask,
  editTask,
} from "../controllers/aptController.js";
const router = Router();

router.get("/allApps", checkAuth, getAllApps);
router.get("/app/:appName", checkAuth, getApp);
router.get("/allPlans", checkAuth, getAllPlans);
router.get("/allTasks", checkAuth, getAllTasks);
router.post("/createApp", checkAuth, createApp);
router.post("/editApp", checkAuth, editApp);
router.post("/createTask", createTask);
router.post("/editTask", editTask);

export default router;
