import mysql from "mysql2/promise";

// console.log(__dirname);
// console.log(process.env.PORT, process.env.PGHOST, process.env.PGPASSWORD);

// Create the connection to database
export default async () => {
  const { MYHOST, MYUSER, MYPASSWORD } = process.env;
  try {
    const connection = await mysql.createConnection({
      host: MYHOST,
      user: MYUSER,
      password: MYPASSWORD,
    });

    // test connection:
    // const [rows, fields] = await connection.execute(
    //   "SELECT * FROM candystore.employees"
    // );
    // console.log(rows);

    return connection;
  } catch (err) {
    console.log(`could not connect to mysql db ${MYHOST} - ${MYUSER}}`);
    console.log(err);
  }
};
