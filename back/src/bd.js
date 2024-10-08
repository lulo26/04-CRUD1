/* cconexión a la base de datos */
/* instanciar la libreria mysql */

const mysql = require("mysql2"); /* principio de inmutabilidad */

/* cadena de conexión o string de conexión */

const cnx = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "sena",
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
