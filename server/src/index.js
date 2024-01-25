import dotenv from "dotenv";
dotenv.config({ path: "config/dev.env" });

import express from "express";
import cors from "cors";

import auth from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

// parse incoming JSON requests
app.use(express.json());

// allows CORS requests
app.use(cors());

app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const start = async () => {
  try {
    /** App listening on port */
    app.listen(PORT, () => {
      console.log(`Listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
