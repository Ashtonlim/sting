import dotenv from "dotenv";
dotenv.config({ path: "config/dev.env" });

import express from "express";
import jobs from "./routes/jobs.js";
import pg from "pg";
const { Pool, Client } = pg;

const app = express();
const PORT = process.env.PORT || 3000;

// console.log(__dirname);
console.log(process.env.PORT, process.env.PGHOST, process.env.PGPASSWORD);

const client = new Client();
await client.connect();

const res = await client.query("SELECT NOW()");
await client.end();
console.log(res);

// const connectDB = () => {
//   const client = new pg.Client({
//     user: process.env.PGUSER,
//     host: process.env.PGHOST,
//     database: process.env.PGDATABASE,
//     password: process.env.PGPASSWORD,
//     port: 5432,
//   });

//   client.connect();
// };

// connectDB();

// console.log(jobs);
app.use("/api/v1", jobs);

/** Simulated bank functionality */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/** App listening on port */
app.listen(PORT, () => {
  console.log(`MyBank app listening at http://localhost:${PORT}`);
});
