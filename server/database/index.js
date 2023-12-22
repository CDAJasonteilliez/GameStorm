import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gamestorm",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connecté à la base de données");
});

export default connection;