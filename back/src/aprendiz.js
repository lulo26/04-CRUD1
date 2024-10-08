// Instancia de express : sirve para crear api rest

const express = require("express");
const bd = require("./bd.js");
const aprendiz = express();

// rutas con consulta a la base de datos

aprendiz.get("/api/aprendiz/listartodos", (req, res) => {
  // hacemos la consulta

  let consulta = "SELECT * FROM aprendiz order by apellido asc";
  bd.query(consulta, (error, aprendiz) => {
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

// listar por id

aprendiz.get("/api/aprendiz/listarporid/:id", (req, res) => {
  // recibimos el parametro

  let id = req.params.id; // express : request params : extrae los parametros de la petición = id

  // hacemos la consulta

  let consulta = "SELECT * FROM aprendiz WHERE id = ?";

  bd.query(consulta, id, (error, aprendiz) => {
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
    password: req.body.password,
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

  bd.query(consulta, id, (error, aprendiz) => {
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
