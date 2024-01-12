const express = require("express");
// const session = require("express-session");
// const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Setup the body parser to handle form submits
// app.use(bodyParser.urlencoded({ extended: true }));

// // Session setup
// app.use(
//   session({ secret: "super-secret", resave: true, saveUninitialized: true })
// );

/** Simulated bank functionality */
app.get("/", (req, res) => {
  //   res.render("index", { isLoggedIn: req.session.isLoggedIn });
  res.send("Hello World!");
});

/** App listening on port */
app.listen(port, () => {
  console.log(`MyBank app listening at http://localhost:${port}`);
});
