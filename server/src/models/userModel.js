import sql from "./db.js";

export const findAll = async ({ username, password }) => {
  console.log(username, password);

  try {
    const [res] = await sql.query(`SELECT * FROM accounts`);
    return { success: true, data: res };
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  findAll,
};
