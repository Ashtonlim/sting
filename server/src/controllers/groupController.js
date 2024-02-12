import { findAll, createSecGroup } from "../models/secGroups.js";

export const getAllGroups = async (req, res) => {
  try {
    const groups = await findAll();
    console.log("hi");

    res.status(200).json(groups);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const createGroup = async (req, res) => {
  try {
    const { groupname } = req.body;
    const group = await createSecGroup(groupname);
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json(err);
  }
};
