import sql from "./db.js";

export const findAll = async () => {
  const findAllQry = `SELECT * FROM secGroups;`;
  try {
    const [groups] = await sql.query(findAllQry);
    return groups;
  } catch (err) {
    throw new Error(err);
  }
};

export const createSecGroup = async (groupname) => {
  const createGrpQry = `INSERT INTO secGroups (groupname) values ('${groupname}')`;

  try {
    const res = await sql.query(createGrpQry);
    console.log("created grp", res);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const findOne = async (groupname) => {
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
  findAll,
  findOne,
  createSecGroup,
};
