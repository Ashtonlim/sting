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

export default {
  findAll,
};
