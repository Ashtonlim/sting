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

    // no user found
    if (res.length < 1) {
      const error = new Error("no results found");
      error.code = 400;
      throw error;
    }

    // one row returned
    return res[0];
  } catch (err) {
    throw new Error(err);
  }
};

export const createUser = async ({ username, password, email }) => {
  // how to pick id?
  // isAlphaNumeric(username);

  try {
    // 1. check if user is an admin
    const isAdmin = await Checkgroup(username, "admin");

    if (!isAdmin) {
      return { success: false, err: "user is not an admin" };
    }

    // 2. reject if user already exists (could be combined based on insert error)
    const getUserByIdQry = `SELECT * FROM accounts WHERE username=${username};`;
    const [users] = await sql.query(getUserByIdQry);
    if (users.length > 0) {
      return { success: false, err: "user already exists" };
    }

    // 3. create hash
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    if (hash) {
      const createUserQry = `
      INSERT INTO accounts (username, password, email) values ('${username}', '${hash}', '${email}');
    `;
      const createdUser = await sql.query(createUserQry);

      return createdUser.affectedRows === 1
        ? { success: true, data: createUser }
        : { success: false, err: "more than one row affected" };
    }
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
