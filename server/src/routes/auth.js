import { Router } from "express";
import {
  register,
  login,
  verifyAccessGrp,
} from "../controllers/authController.js";
import { checkJWT } from "../middlewares/auth.js";
import { sqlAllMultiLine } from "../models/db.js";
import bcrypt from "bcryptjs";

const router = Router();

router.post("/register", checkJWT, register);
router.post("/login", login);
router.post("/verifyAccessGrp", checkJWT, verifyAccessGrp);

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
//                     id int(12) NOT NULL,
//                     username varchar(20) NOT NULL,
//                     password varchar(${maxHashLen}) NOT NULL,
//                     email varchar(${maxEmailLen}),
//                     isActive BOOLEAN DEFAULT TRUE,
//                     secGrp TEXT
//                 ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
//                 INSERT INTO accounts (id, username, password, email, secGrp) VALUES (1, 'admin', '${adminPwdHash}', 'admin@st.co', 'admin');
//                 ALTER TABLE accounts ADD PRIMARY KEY (id);
//                 ALTER TABLE accounts MODIFY id int(12) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
//                 `;

//   sqlAllMultiLine.query(QryString, (err, results) => {
//     if (err) throw err;
//     console.log(results);
//     return true;
//   });
// };
// router.get("/reset", resetDB);

export default router;
