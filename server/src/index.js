import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import express from "express";
import cors from "cors";

import auth from "./routes/auth.js";
import user from "./routes/user.js";
import group from "./routes/group.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "config", "dev.env") });

const app = express();
const PORT = process.env.PORT || 3000;
// parse incoming JSON requests
app.use(express.json());

// allows CORS requests
// app.use(cors());

app.use(
  cors({
    // Access to XMLHttpRequest at 'http://localhost:3000/auth/login'
    // from origin 'http://localhost:5173' has been blocked by CORS policy:
    // Response to preflight request doesn't pass access control check:
    // The value of the 'Access-Control-Allow-Origin' header in the response
    // must not be the wildcard '*' when the request's credentials mode is 'include'.
    // The credentials mode of requests initiated by the XMLHttpRequest
    // is controlled by the withCredentials attribute.
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204

    // credentials: Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
    credentials: true,
  })
);

app.use("/auth", auth);
app.use("/user", user);
app.use("/group", group);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const start = async () => {
  try {
    /** App listening on port */
    app.listen(PORT, () => {
      console.log(
        `Listening at http://localhost:${PORT}\nEnv: ${process.env.NODE_ENV} | sqlUser: ${process.env.MYUSER}`
      );
    });
  } catch (err) {
    console.log(err);
  }
};

start();

// app.use(function (req, res, next) {
//   res.header("Content-Type", "application/json;charset=UTF-8");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
