import sql, { sqlAllMultiLine } from "./db.js";
// defCheck;

// You would need to create a function that
// returns a value to indicate if a user is in a group.
// userid = username

export const findAll = async () => {
  const findAllQry = `SELECT * FROM accounts;`;
  try {
    const [users] = await sql.query(findAllQry);
    return users;
  } catch (err) {
    throw new Error(err);
  }
};

export const findById = async (username) => {
  try {
    const getUserByIdQry = `SELECT * FROM accounts WHERE username='${username}';`;
    const [res] = await sql.query(getUserByIdQry);

    // multiple results found,
    // should not happen in db as id is unique
    // fix data problem if so
    if (res.length > 1) {
      const error = new Error("multiple rows found");
      error.code = 400;
      throw error;
    }

    // one row returned
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const createUser = async ({ username, password, email }) => {
  try {
    const createUserQry = `
      INSERT INTO accounts (username, password, email) values ('${username}', '${hash}', '${email}');
    `;
    const createdUser = await sql.query(createUserQry);

    if (createdUser.affectedRows !== 1) {
      throw new Error("more than one row affected");
    }

    return createdUser;
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  createUser,
  findAll,
  findById,
};

// // review: please remove, rm endpoint as well
// export const resetDB = () => {
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

//   sqlAllMultiLine.Qry(QryString, (err, results) => {
//     if (err) throw err;
//     console.log(results);
//     return true;
//   });
// };
