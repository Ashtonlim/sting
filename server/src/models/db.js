// import mysqlCredentials from "../config/db.config";
import dotenv from "dotenv";
dotenv.config({ path: "config/dev.env" });

import mysql from "mysql2";

const { MYHOST, MYUSER, MYPASSWORD, MYDATABASE } = process.env;

const mysqlCredentials = {
  host: MYHOST,
  user: MYUSER,
  password: MYPASSWORD,
};

const sql = mysql.createPool({ ...mysqlCredentials, database: MYDATABASE });

export default sql;

export const sqlAll = mysql.createPool({ ...mysqlCredentials });

export const sqlAllMultiLine = mysql.createPool({
  ...mysqlCredentials,
  multipleStatements: true,
});
