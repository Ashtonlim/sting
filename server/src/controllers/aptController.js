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

export const getTask = async (req, res) => {
  try {
    const geTaskQry = `SELECT * FROM task WHERE Task_id = '${req.params.taskId}';`;
    const [task] = await sql.query(geTaskQry);
    console.log(task);
    if (task.length !== 1) {
      return res.status(404).send("task not found or multiple tasks found");
    }

    res.status(200).json(task[0]);
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

export const editApp = async (req, res) => {
  try {
    console.log(req.byUser, req.secGrp);
    if (!req.secGrp?.includes("pl")) {
      return res.status(403).send("User is not a PL");
    }
    console.log("hi");

    const params = [
      "App_Description",
      "App_startDate",
      "App_endDate",
      "App_permit_Open",
      "App_permit_toDoList",
      "App_permit_Doing",
      "App_permit_Done",
      "App_Acronym",
    ];
    const queryParams = params.map((param) =>
      req.body[param] ? `${req.body[param]}` : null
    );

    console.log(queryParams);
    const editAppQry =
      "UPDATE application SET App_Description = ?, App_startDate = ?, App_endDate = ?, App_permit_Open = ?, App_permit_toDoList = ?, App_permit_Doing = ?, App_permit_Done = ? WHERE App_Acronym = ?;";

    console.log("editAppQry", editAppQry);
    const [app] = await sql.query(editAppQry, queryParams);
    console.log("created app", app);
    res.status(200).json(app);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const createPlan = async (req, res) => {
  try {
    console.log(req.byUser, req.secGrp);
    if (!req.secGrp?.includes("pm")) {
      return res.status(403).send("User is not a PM");
    }

    console.log(req.body);
    const params = [
      "Plan_MVP_name",
      "Plan_startDate",
      "Plan_endDate",
      "Plan_app_Acronym",
    ];
    const queryParams = params.map((param) =>
      req.body[param] ? `${req.body[param]}` : null
    );

    console.log(queryParams);
    const addPlanQry =
      "INSERT INTO plan (Plan_MVP_name, Plan_startDate, Plan_endDate, Plan_app_Acronym) VALUES (?,?,?,?);";

    const [app] = await sql.query(addPlanQry, queryParams);
    console.log("created app", app);
    res.status(200).json(app);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const editPlan = async (req, res) => {
  try {
    console.log(req.byUser, req.secGrp);
    if (!req.secGrp?.includes("pl")) {
      return res.status(403).send("User is not a PL");
    }
    console.log("hi");

    const params = [
      "App_Description",
      "App_startDate",
      "App_endDate",
      "App_permit_Open",
      "App_permit_toDoList",
      "App_permit_Doing",
      "App_permit_Done",
      "App_Acronym",
    ];
    const queryParams = params.map((param) =>
      req.body[param] ? `${req.body[param]}` : null
    );

    console.log(queryParams);
    const editAppQry =
      "UPDATE application SET App_Description = ?, App_startDate = ?, App_endDate = ?, App_permit_Open = ?, App_permit_toDoList = ?, App_permit_Doing = ?, App_permit_Done = ? WHERE App_Acronym = ?;";

    console.log("editAppQry", editAppQry);
    const [app] = await sql.query(editAppQry, queryParams);
    console.log("created app", app);
    res.status(200).json(app);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const createTask = async (req, res) => {
  try {
    // console.log(req.byUser, req.secGrp);
    // if (!req.secGrp?.includes("pl")) {
    //   return res.status(403).send("User is not a PL, only PL can create tasks");
    // }

    req.byUser = "ash";

    if (!req.byUser) {
      res.status(401).send("Requesting user's credentials not found");
    }

    console.log(req.body);
    const app_Acr = req.body["Task_app_Acronym"];
    const params = [
      "Task_name",
      "Task_description",
      "Task_notes",
      "Task_id",
      "Task_plan",
      "Task_app_Acronym",
      "Task_state",
      "Task_creator",
      "Task_owner",
      "Task_createDate",
    ];

    // get running no
    const getAppQry =
      "SELECT App_Rnumber FROM application WHERE App_Acronym = ?";
    const [app] = await sql.query(getAppQry, [app_Acr]);

    if (app.length !== 1) {
      res.status(401).send("App not found");
    }

    // create task ID [App_Acronym]_[App_Rnumber].
    req.body["Task_id"] = `${app_Acr}_${app[0].App_Rnumber}`;

    req.body["Task_creator"] = req.byUser;
    req.body["Task_createDate"] = new Date().toISOString().slice(0, 10);
    req.body["Task_state"] = "Open";
    req.body["Task_owner"] = "PM";

    const queryParams = params.map((param) =>
      req.body[param] ? `${req.body[param]}` : null
    );
    // res.status(200).json({ queryParams });

    // console.log(queryParams);
    const addAppQry =
      "INSERT INTO Task (Task_name, Task_description, Task_notes, Task_id, Task_plan, Task_app_Acronym, Task_state, Task_creator, Task_owner, Task_createDate) VALUES (?,?,?,?,?,?,?,?,?,?);";
    const [iAppRes] = await sql.query(addAppQry, queryParams);
    // console.log("created app", iAppRes);
    res.status(200).json(iAppRes);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const editTask = async (req, res) => {
  try {
    // console.log(req.byUser, req.secGrp);
    if (!req.secGrp?.includes("pl")) {
      return res.status(403).send("User is not a PL");
    }

    const params = [
      "Task_description",
      "Task_notes",
      "Task_add_notes",
      "Task_id",
      "Task_plan",
      "Promote",
    ];

    req.body["Task_notes"] =
      req.body["Task_notes"] + req.body["Task_add_notes"];

    const queryParams = params.map((param) =>
      req.body[param] ? `${req.body[param]}` : null
    );

    console.log(queryParams);
    const editTaskQry =
      "UPDATE task SET Task_description = ?, Task_notes = ?, Task_plan = ? WHERE Task_id = ?;";

    console.log("editAppQry", editTaskQry);
    const [app] = await sql.query(editTaskQry, queryParams);
    console.log("created app", app);
    res.status(200).json(app);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
