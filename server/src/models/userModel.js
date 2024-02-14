import sql from "./db.js";

export const findAll = async (onlyCols = [], excludeCols = []) => {
  // const allCols = ["username", "password", "email", "isActive", "secGrp"];
  // const excludeColsSet = new Set(excludeCols);
  // const getCols = (onlyCols?.length ? onlyCols : allCols).filter(
  //   (colName) => !excludeColsSet.has(colName)
  // );
  // console.log(getCols.join(", "));
  // const getUserByIdQry = `SELECT ${allCols.join(", ")} FROM accounts;`;

  const getUserByIdQry = `SELECT username, email, isActive, secGrp FROM accounts;`;

  try {
    const [users] = await sql.query(getUserByIdQry);
    return users;
  } catch (err) {
    throw new Error(err);
  }
};

export const findById = async (username) => {
  const getUserByIdQry = `SELECT * FROM accounts WHERE username='${username}';`;

  try {
    const [res] = await sql.query(getUserByIdQry);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const createUser = async ({ username, password, email, groups }) => {
  try {
    console.log(groups);
    const createUserQry = `
      INSERT INTO accounts (username, password, email, secGrp) values ('${username}', '${password}', ${
      email ? email : null
    }, ${groups ? `'${groups}'` : null});
    `;
    const createdUser = await sql.query(createUserQry);

    if (createdUser[0].affectedRows !== 1) {
      throw new Error("more than one row affected");
    }

    return createdUser;
  } catch (err) {
    throw new Error(err);
  }
};

export const editUser = async ({
  username,
  password,
  email,
  isActive,
  secGrp,
}) => {
  try {
    const updateUserQry = `UPDATE accounts SET password='${password}', email='${email}', isActive='${
      isActive ? 1 : 0
    }', secGrp=${secGrp ? `'${secGrp}'` : null} WHERE username='${username}';`;

    console.log("query is", updateUserQry);
    const updatedUser = await sql.query(updateUserQry);
    if (updatedUser[0].affectedRows !== 1) {
      throw new Error("more than one row affected");
    }
    return updatedUser;
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  createUser,
  findAll,
  findById,
  editUser,
};
