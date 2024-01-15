import dotenv from "dotenv";
dotenv.config({ path: "config/dev.env" });

import express from "express";
import connectdb from "./database.js";

import jobs from "./routes/jobs.js";

const app = express();
const PORT = process.env.PORT || 3000;

// connect to db
const connection = connectdb();

app.use("/api/v1", jobs);
app.use("/api/v1/auth", auth);

/** Simulated bank functionality */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/** App listening on port */
app.listen(PORT, () => {
  console.log(`MyBank app listening at http://localhost:${PORT}`);
});
