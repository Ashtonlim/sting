import sql, { sqlAllMultiLine } from "./db.js";
import bcrypt from "bcryptjs";
import { isAlphaNumeric } from "../utils.js";
// defCheck;

// You would need to create a function that
// returns a value to indicate if a user is in a group.
// userid = username
const Checkgroup = async (userid, groupname) => {
  const getUserByIdQry = `SELECT * FROM WHERE username='${userid}';`;
  try {
    const [users] = await sql.query(getUserByIdQry);

    if (users.length !== 1) {
      return 0;
    }

    return users[0].secGrp.split(",").includes(groupname);
  } catch (err) {
    throw new Error(err);
  }
};

export const createUser = async ({ username, password, email }) => {
  // how to pick id?
  isAlphaNumeric(username);

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
      console.log(createUser);
      if (createdUser.affectedRows === 1) {
        return { success: true, data: createUser };
      }
      return { success: false, err: "more than one row affected" };
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const loginUser = async ({ username, password }) => {
  console.log(username, password);

  try {
    const getUserByIdQry = `SELECT * FROM accounts WHERE username='${username}';`;
    const [users] = await sql.query(getUserByIdQry);
    // console.log(res);

    // multiple users found,
    // should not happen in db as username is unique
    // fix data problem if so
    if (users.length > 1) {
      return { success: false, err: "multiple users found" };
    }

    // no user found
    if (users.length < 1) {
      return { success: false, err: "no users found" };
    }

    // one user returned
    const user = users[0];

    // user.password is hash
    const isPwdCorrect = bcrypt.compareSync(password, user.password);

    if (!isPwdCorrect) {
      return { success: false, err: "incorrect password" };
    }

    delete user.password;
    return { success: true, data: user };
  } catch (err) {
    throw new Error(err);
  }
};

// review: please remove, rm endpoint as well
export const resetDB = () => {
  // https://www.rfc-editor.org/errata_search.php?rfc=3696&eid=1690
  const maxEmailLen = 320;
  const maxHashLen = 64;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const adminPwdHash = bcrypt.hashSync("qwe", salt);

  const QryString = `
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

  sqlAllMultiLine.Qry(QryString, (err, results) => {
    if (err) throw err;
    console.log(results);
    return true;
  });
};

// export const createFirstAdmin = async () => {
//   // how to pick id?
//   const saltRounds = 10;
//   const salt = bcrypt.genSaltSync(saltRounds);
//   const hash = bcrypt.hashSync('qwe', salt);

//   if (hash) {
//     const createUserQry = `
//       INSERT INTO accounts (username, password, email, secGrp) values ('admin', '${hash}', 'admin@st.co', 'admin);
//     `;
//     const res = await sql.query(createUserQry);
//     console.log(res);
//   }
// };

export default {
  Checkgroup,
  createUser,
  loginUser,
  resetDB,
};
