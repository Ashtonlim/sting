import { sg_findAll, sg_createSecGroup } from "../models/secGroups.js";

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
    const group = await sg_createSecGroup(groupname);
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json(err);
  }
};
