/* cconexión a la base de datos */
/* instanciar la libreria mysql */

const mysql = require("mysql2"); /* principio de inmutabilidad */
const aprendiz = require("./aprendiz");

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

// autenticacion de un factor

aprendiz.post("/users/login", (req, res) => {
  //datos de la peticion (body)
  let email = req.body.email;
  let password = req.body.password;

  //validamos que la data esté completa
  if (!email || !password) {
    res.status(400).send({
      consulta: "error",
      mensaje: "faltan datos por enviar del formulario ! ",
    });
  }

  let correo;
  let pass;
  let lasname;
  let name;

  // buscar en la bd el usuario  y validar
  bd.query(
    "SELECT name, lastname, email, password FROM users WHERE email like ?",
    [email],
    (error, consulta) => {
      consulta.forEach((element) => {
        // seteamos las varuables con el resultado de la consulta
        pass = element.password;
        correo = element.email;
        name = element.name;
        lasname = element.lastname;
      });

      // validación 1; email corresponde
      if (correo == null) {
        res.status(400).send({
          status: "error",
          mensaje: "Usuario no existe en la BD",
        });
      }
      console.log(password);
      console.log(pass);
      let pwd = bcrypt.compareSync(password, pass);
      console.log(pwd);
      if (!pwd) {
        res.status(400).send({
          status: "error",
          mensaje: "Pwd Incorrecto !",
        });
      } else {
        res.status(200).send({
          consulta: "ok",
          mensaje: "Ingreso exitoso al sistema!",
          user: name + " " + lasname,
          email: email,
        });
      }
    }
  );
});

module.exports = cnx;
