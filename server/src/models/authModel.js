import sql, { sqlAll, sqlAllMultiLine } from "./db.js";

export const registerUser = ({ username, password, email }) => {
  // how to pick id?
  console.log(username, password, email);
  sql.query(
    `INSERT INTO accounts (username, password, email) values ('${username}', '${password}', '${email}');`,
    (err, results) => {
      if (err) throw err;
      console.log(results);
    }
  );
};

export const loginUser = () => {
  sql.query("SELECT * FROM accounts", (err, results) => {
    if (err) throw err;
    console.log(results);
  });
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
