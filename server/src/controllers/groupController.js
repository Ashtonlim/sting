import { sg_findAll } from "../models/secGroups.js";
import sql from "../models/db.js";

export const getAllGroups = async (req, res) => {
  if (!req.isAdmin) {
    console.log("not admin", req.isAdmin);
    return res.status(403).send("User is not an admin");
  }

  console.log("getallgrps", req.isAdmin);

  try {
    const groups = await sg_findAll();
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
