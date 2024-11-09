/* cconexión a la base de datos */
/* instanciar la libreria mysql */

const mysql = require("mysql2"); /* principio de inmutabilidad */

/* cadena de conexión o string de conexión */

const cnx = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

/* connection.query("SELECT * FROM aprendiz", (err, results) => {
  console.log(results); /* results contains rows returned by server
}) */

cnx.connect((error) => {
  if (error) {
    console.log(`error en la conexion: \n ${error}`);
    // throw ""error en la cnexion aa la 80;
  } else {
    console.log("conexión existosa a la BD");
  }
});

module.exports = cnx;
