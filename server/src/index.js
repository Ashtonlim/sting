import dotenv from "dotenv";
dotenv.config({ path: "config/dev.env" });

import express from "express";
import cors from "cors";

import auth from "./routes/auth.js";
import user from "./routes/user.js";
import group from "./routes/group.js";

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

// app.use(function (req, res, next) {
//   res.header("Content-Type", "application/json;charset=UTF-8");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use("/auth", auth);
app.use("/user", user);
app.use("/group", group);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   console.log(username, password);
//   return res.status(200).json({ message: "login success" });
// });

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
