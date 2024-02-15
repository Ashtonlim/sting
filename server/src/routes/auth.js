import { Router } from "express";
import {
  register,
  login,
  verifyAccessGrp,
} from "../controllers/authController.js";
import { checkAuth } from "../middlewares/auth.js";

// import { sqlAllMultiLine } from "../models/db.js";
// import bcrypt from "bcryptjs";

const router = Router();

router.post("/register", checkAuth, register);
router.post("/login", login);
router.post("/verifyAccessGrp", checkAuth, verifyAccessGrp);

export default router;

// review: please remove, rm endpoint as well
// export const resetDB = () => {
//   console.log("reset db");
//   // https://www.rfc-editor.org/errata_search.php?rfc=3696&eid=1690
//   const maxEmailLen = 320;
//   const maxHashLen = 64;
//   const saltRounds = 10;
//   const salt = bcrypt.genSaltSync(saltRounds);
//   const adminPwdHash = bcrypt.hashSync("qwe", salt);

//   const QryString = `
//                 DROP DATABASE IF EXISTS nodelogin;
//                 CREATE DATABASE IF NOT EXISTS nodelogin DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
//                 USE nodelogin;
//                 CREATE TABLE IF NOT EXISTS accounts (
//                     username varchar(20) NOT NULL PRIMARY KEY,
//                     password varchar(${maxHashLen}) NOT NULL,
//                     email varchar(${maxEmailLen}) UNIQUE,
//                     isActive BOOLEAN DEFAULT TRUE,
//                     secGrp TEXT
//                 ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
//                 INSERT INTO accounts (username, password, email, secGrp) VALUES ('admin', '${adminPwdHash}', 'admin@st.co', 'admin');
//                 `;

//   sqlAllMultiLine.query(QryString, (err, results) => {
//     if (err) throw err;
//     console.log(results);
//     return true;
//   });
// };
// router.get("/reset", resetDB);
