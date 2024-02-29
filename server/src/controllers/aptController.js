import jwt from "jsonwebtoken";

import sql from "../config/db.js";

export const getAllApps = async (req, res) => {
  try {
    const getAppsQry = `SELECT App_Acronym, App_startDate, App_endDate FROM application;`;
    const [apps] = await sql.query(getAppsQry);

    res.status(200).json(apps);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getApp = async (req, res) => {
  try {
    const getAppQry = `SELECT * FROM application WHERE App_Acronym = '${req.params.appName}';`;
    const [app] = await sql.query(getAppQry);

    if (app.length !== 1) {
      return res.status(404).send("App not found or multiple apps found");
    }
    delete app[0].App_Rnumber;
    res.status(200).json(app[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllPlans = async (req, res) => {
  try {
    const getAppsQry = `SELECT * FROM plan;`;
    const [apps] = await sql.query(getAppsQry);

    res.status(200).json(apps);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const getAppsQry = `SELECT * FROM task;`;
    const [apps] = await sql.query(getAppsQry);

    res.status(200).json(apps);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createApp = async (req, res) => {
  try {
    console.log(req.byUser, req.secGrp);
    if (!req.secGrp?.includes("pl")) {
      return res.status(403).send("User is not a PL");
    }

    console.log(req.body);
    const params = [
      "App_Acronym",
      "App_Description",
      "App_startDate",
      "App_endDate",
      "App_permit_Open",
      "App_permit_toDoList",
      "App_permit_Doing",
      "App_permit_Done",
    ];
    const queryParams = params.map((param) =>
      req.body[param] ? `${req.body[param]}` : null
    );

    console.log(queryParams);
    const addAppQry =
      "INSERT INTO application (App_Acronym, App_Description, App_startDate, App_endDate, App_permit_Open, App_permit_toDoList, App_permit_Doing, App_permit_Done) VALUES (?,?,?,?,?,?,?,?);";
    const [app] = await sql.query(addAppQry, queryParams);
    console.log("created app", app);
    res.status(200).json(app);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
