import sql, { sqlAllMultiLine } from "./db.js";
import bcrypt from "bcrypt";

export const registerUser = ({ username, password, email }) => {
  // how to pick id?
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    // console.log(username, password, email);
    if (err) throw err;
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      sql.query(
        `INSERT INTO accounts (username, password, email) values ('${username}', '${hash}', '${email}');`,
        (err, results) => {
          if (err) throw err;
          console.log(results);
        }
      );
    });
  });
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
        console.log("Error: multiple users found");
      } else {
        bcrypt.compare(password, results[0].password, (err, result) => {
          if (err) throw err;
          console.log(result);
          if (result) {
            console.log("user found");
            return true;
          } else {
            console.log("incorrect password");
            return false;
          }
        });
      }
      console.log();
    }
  );
};

export const resetDB = () => {
  const queryString = `
                DROP DATABASE IF EXISTS nodelogin; 
                CREATE DATABASE IF NOT EXISTS nodelogin DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
                USE nodelogin;
                CREATE TABLE IF NOT EXISTS accounts (
                    id int(11) NOT NULL,
                    username varchar(50) NOT NULL,
                    password varchar(255) NOT NULL,
                    email varchar(100) NOT NULL
                ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
                INSERT INTO accounts (id, username, password, email) VALUES (1, 'test', 'test', 'test@test.com');
                ALTER TABLE accounts ADD PRIMARY KEY (id);
                ALTER TABLE accounts MODIFY id int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
                `;
  sqlAllMultiLine.query(queryString, (err, results) => {
    if (err) throw err;
    console.log(results);
    return true;
  });
};
