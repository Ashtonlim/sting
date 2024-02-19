import sql from "../config/db.js";

export const getAllGroups = async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).send("User is not an admin");
  }

  try {
    const findAllQry = `SELECT * FROM secGroups;`;
    const [groups] = await sql.query(findAllQry);
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createGroup = async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).send("User is not an admin");
  }

  try {
    const { groupname } = req.body;
    const createGrpQry = `INSERT INTO secGroups (groupname) values ('${groupname}')`;
    await sql.query(createGrpQry);
    res.status(200).json("Group created");
  } catch (err) {
    console.log(err);
    res.status(500).json("Could not create group");
  }
};
