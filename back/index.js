// Instancia de express : sirve para crear api rest

const express = require("express");

// configuración de .ENV

require("dotenv").config();

// activamos cors
const cors = require("cors");

// instanciamos la conexion a la bd

const app = express(); // invocamos el método constructor de la clase express
const puerto = process.env.PORT || 4100;

//let permitidas = {};

app.use(cors());
app.use(express.json()); // serializar los request y response

app.use("/", require("./src/aprendiz.js"));

app.listen(puerto, () => {
  console.log(`api rest encendida en el puerto ${puerto}`);
});
