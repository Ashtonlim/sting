import secGroups from "../models/secGroups.js";

export const getAllGroups = async (req, res) => {
  try {
    const groups = await secGroups.findAll();
    res.status(200).json(groups);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const createGroup = async (req, res) => {
  try {
    const group = await secGroups.createSecGroup(req.body);
    console.log("group", group);
    res.status(200).json(group);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};