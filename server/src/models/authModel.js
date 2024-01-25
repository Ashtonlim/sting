import sql, { sqlAllMultiLine } from "./db.js";
import bcrypt from "bcryptjs";

export const adminCreateUser = async ({ username, password, email }) => {
  // how to pick id?
  // 1. reject if user already exists (could be combined based on insert error)

  // 2. create hash
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  if (hash) {
    const queryString = `
      INSERT INTO accounts (username, password, email) values ('${username}', '${hash}', '${email}');
    `;

    sql.query(queryString, (err, results) => {
      if (err) throw err;
      console.log(results);
      return { message: "user created" };
    });
  }
};

export const loginUser = ({ username, password }) => {
  console.log(username, password);
  sql.query(
    `SELECT * FROM accounts WHERE username='${username}'`,
    (err, results) => {
      if (err) throw err;
      if (results.length === 0) {
        console.log("no user found");
        return false;
      } else if (results.length > 1) {
        return { message: "Error: multiple users found" };
      } else {
        const hash = results[0].password;
        console.log(hash);
        const isPwdCorrect = bcrypt.compareSync(password, hash);

        if (isPwdCorrect) {
          console.log("user found");
          return true;
        } else {
          console.log("incorrect password");
          return false;
        }
      }
    }
  );
};

// review: please remove, rm endpoint as well
export const resetDB = () => {
  // https://www.rfc-editor.org/errata_search.php?rfc=3696&eid=1690
  const maxEmailLen = 320;
  const maxHashLen = 64;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const adminPwdHash = bcrypt.hashSync("qwe", salt);

  const queryString = `
                DROP DATABASE IF EXISTS nodelogin; 
                CREATE DATABASE IF NOT EXISTS nodelogin DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
                USE nodelogin;
                CREATE TABLE IF NOT EXISTS accounts (
                    id int(12) NOT NULL,
                    username varchar(20) NOT NULL,
                    password varchar(${maxHashLen}) NOT NULL,
                    email varchar(${maxEmailLen}),
                    isActive BOOLEAN DEFAULT TRUE,
                    secGrp TEXT
                ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
                INSERT INTO accounts (id, username, password, email, secGrp) VALUES (1, 'admin', '${adminPwdHash}', 'admin@st.co', 'admin');
                ALTER TABLE accounts ADD PRIMARY KEY (id);
                ALTER TABLE accounts MODIFY id int(12) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
                `;

  sqlAllMultiLine.query(queryString, (err, results) => {
    if (err) throw err;
    console.log(results);
    return true;
  });
};
