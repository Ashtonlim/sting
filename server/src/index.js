import express from "express";
import dotenv from "dotenv";
import jobs from "./routes/jobs.js";

// const express = require("express");
dotenv.config({ path: "../config/dev.env" });

const app = express();
const PORT = process.env.PORT || 3000;

// console.log(jobs);
app.use(jobs);

/** Simulated bank functionality */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/** App listening on port */
app.listen(PORT, () => {
  console.log(`MyBank app listening at http://localhost:${PORT}`);
});
