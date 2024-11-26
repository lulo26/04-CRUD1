const express = require("express");
const bd = require("./bd.js");
const aprendiz = express();
const bcrypt = require("bcryptjs");

// parametizacion de consultas con js
// los parametros estos usan a sintaxis del url /:nombreparametro
// sintaxis del url, sintaxis url /?nombre

aprendiz.get("api/aprendiz/consulta/:id", (req, res) => {
  let parametro = req.params;
  let queries = req.query;

  res.send({ queries: queries });
});

// rutas con consulta a la base de datos

aprendiz.get("/api/aprendiz/listartodos", (req, res) => {
  // recibir el  limite

  let limite = req.query.limite;

  // recibir la página

  let pagina = req.query.pagina;

  // calcular el offset

  let offset = (pagina - 1) * limite;

  // hacemos la consulta
  let consulta = "SELECT COUNT(*) as TOTALAPRENDICES FROM aprendiz";
  let consulta2 = "SELECT * FROM aprendiz limit ? offset ?";
  bd.query(consulta, (error, aprendiz) => {
    bd.query(consulta2, [], limite, offset),
      (error) => {
        bd.query(consulta2, [limite, offset], (error, aprendiz) => {
          res.send({
            totalaprendiz: totalaprendiz,
            aprendiz: aprendiz,
          });
        });
      };

    /*if (error) {
      res.send({
        status: "error",
        mensaje: "ocurrió un error en la consulta!",
        error: error,
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "consulta exitosa",
        aprendiz: aprendiz,
      });
    }*/
  });
});

// listar por id

aprendiz.get("/api/aprendiz/listarporid/:id", (req, res) => {
  // recibimos el parametro

  let id = req.params.id; // express : request params : extrae los parametros de la petición = id

  // hacemos la consulta

  let consulta = "SELECT * FROM aprendiz WHERE id = ?";

  bd.query(consulta, [id], (error, aprendiz) => {
    if (error) {
      res.send({
        status: "error",
        mensaje: "ocurrió un error en la consulta!",
        error: error,
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "consulta exitosa",
        aprendiz: aprendiz,
      });
    }
  });
});

// listar por apellido

aprendiz.get("/api/aprendiz/listarporapellido/:apellido", (req, res) => {
  // recibimos el parametro

  let apellido = req.params.apellido; // express : request params : extrae los parametros de la petición = id

  // hacemos la consulta

  let consulta = "SELECT * FROM aprendiz WHERE apellido = ?";

  bd.query(consulta, [apellido], (error, aprendiz) => {
    if (error) {
      res.send({
        status: "error",
        mensaje: "ocurrió un error en la consulta!",
        error: error,
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "consulta exitosa",
        aprendiz: aprendiz,
      });
    }
  });
});

// crear aprendiz : usa el metodo post

aprendiz.post("/api/aprendiz/crear", (req, res) => {
  // recibimos la data enviada desde el formulario

  let frmDatos = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  };

  // hacemos la consulta

  let consulta = "INSERT INTO aprendiz SET ?";

  bd.query(consulta, [frmDatos], (error, aprendiz) => {
    if (error) {
      res.send({
        status: "error",
        mensaje: "ocurrió un error en la consulta!",
        error: error,
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "consulta exitosa",
        aprendiz: aprendiz,
      });
    }
  });
});

// eliminar aprendiz

aprendiz.delete("/api/aprendiz/borrarporid/:id", (req, res) => {
  // recibimos el parametro

  let id = req.params.id; // express : request params : extrae los parametros de la petición = id

  // hacemos la consulta

  let consulta = "DELETE FROM aprendiz WHERE id = ?";

  bd.query(consulta, [id], (error, aprendiz) => {
    if (error) {
      res.send({
        status: "error",
        mensaje: "ocurrió un error en la consulta!",
        error: error,
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "consulta exitosa",
        aprendiz: aprendiz,
      });
    }
  });
});

// editar un aprendiz

aprendiz.put("/api/aprendiz/editarporid/:id", (req, res) => {
  // recibimos la data enviada desde el formulario
  let id = req.params.id;
  let frmDatos = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    password: req.body.password,
  };

  // hacemos la consulta

  let consulta = "UPDATE aprendiz SET ? WHERE id = ?";

  bd.query(consulta, [frmDatos, id], (error, aprendiz) => {
    if (error) {
      res.send({
        status: "error",
        mensaje: "ocurrió un error en la consulta!",
        error: error,
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "actualización exitosa",
        aprendiz: aprendiz,
      });
    }
  });
});

module.exports = aprendiz;
