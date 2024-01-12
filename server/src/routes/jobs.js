import express from "express";

const router = express.Router();

router.get("/jobs", (req, res) => {
  res.status(200).json({ message: "jobs route" });
});

export default router;
