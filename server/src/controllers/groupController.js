import { sg_findAll, sg_createSecGroup } from "../models/secGroups.js";

export const getAllGroups = async (req, res) => {
  try {
    const groups = await sg_findAll();
    console.log("getAllGroups --");

    res.status(200).json(groups);
  } catch (err) {
    console.log("getAllGroups -- err");

    res.status(500).json(err);
  }
};

export const createGroup = async (req, res) => {
  try {
    const { groupname } = req.body;
    const group = await sg_createSecGroup(groupname);
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json(err);
  }
};
