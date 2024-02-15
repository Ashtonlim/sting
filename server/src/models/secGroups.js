import sql from "./db.js";

export const sg_findAll = async () => {
  const findAllQry = `SELECT * FROM secGroups;`;
  try {
    const [groups] = await sql.query(findAllQry);
    return groups;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const sg_findOne = async (groupname) => {
  const findAllQry = `SELECT * FROM secGroups where groupname=${groupname};`;
  try {
    const [groups] = await sql.query(findAllQry);
    if (groups.length > 1) {
      const error = new Error("multiple rows found");
      error.code = 500;
      throw error;
    }
    return groups;
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  sg_findAll,
  sg_findOne,
};
