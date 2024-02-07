import sql from "./db.js";

export const findAll = async () => {
  const findAllUsersQry = `SELECT * FROM accounts;`;
  try {
    const [users] = await sql.query(findAllUsersQry);
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
      error.code = 500;
      throw error;
    }

    // one row returned
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const createUser = async ({ username, password, email, groups }) => {
  try {
    const createUserQry = `
      INSERT INTO accounts (username, password, email, secGrp) values ('${username}', '${password}', '${email}', '${groups}');
    `;
    const createdUser = await sql.query(createUserQry);
    // console.log(createdUser[0].affectedRows);
    // console.log(createdUser);
    if (createdUser[0].affectedRows !== 1) {
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
