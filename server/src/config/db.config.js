import mysql from "mysql2/promise";
const { MYHOST, MYUSER, MYPASSWORD } = process.env;

const mysqlCredentials = {
  host: MYHOST,
  user: MYUSER,
  password: MYPASSWORD,
};

export default mysqlCredentials;
