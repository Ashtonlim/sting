import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import mysqlSync from "mysql2";
import mysql from "mysql2/promise";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", "config", "dev.env") });

const { MYHOST, MYUSER, MYPASSWORD, MYDATABASE } = process.env;

console.log(MYHOST, MYUSER, MYPASSWORD, MYDATABASE);

const mysqlCredentials = {
  host: MYHOST,
  user: MYUSER,
  password: MYPASSWORD,
};

const sql = mysql.createPool({ ...mysqlCredentials, database: MYDATABASE });
export default sql;

export const sqlAll = mysql.createPool({ ...mysqlCredentials });

export const sqlAllMultiLine = mysqlSync.createPool({
  ...mysqlCredentials,
  multipleStatements: true,
});

export const sqlSync = mysqlSync.createPool({
  ...mysqlCredentials,
  database: MYDATABASE,
});
