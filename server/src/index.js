import dotenv from "dotenv";
dotenv.config({ path: "config/dev.env" });

import express from "express";
import cors from "cors";

import connectdb from "./config/database.js";

import auth from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use("/api/v1/auth", auth);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const startServer = async () => {
  try {
    // connect to db
    const connection = await connectdb();
    console.log("connected to db");

    /** App listening on port */
    app.listen(PORT, () => {
      console.log(`Listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
