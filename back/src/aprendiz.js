const express = require("express");
const bd = require("./bd.js");
const aprendiz = express();
const bcrypt = require("bcryptjs");
// middleware para subir archivos a una api
const multer = require("multer")
// método de node para manipular archivos -- mover, copiar
const fs = require("fs");
// metodo de node para manipular rutas dentro de la api
const path = require("path");

// configuración del almacenamiento multer

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, './uploads/images')
  },
  filename:function(req, file, cb){
    //const uniqueSuffix = "img" + Date.now() + "-" + file.originalname)
    cb(null, "img-" + Date.now() + "-" + file.originalname);
  },
});

// instanciamos el storage
const upload = multer({storage: storage});

// muler, fs, path

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
  let limite = parseInt(req.query.limite);

  // recibir la página
  let pagina = parseInt(req.query.pagina);

  // calcular el offset
  let offset = (pagina - 1) * limite;

  // hacemos la consulta
  let query_count = "SELECT COUNT(*) as totalaprendices FROM aprendiz";
  let query = "SELECT * FROM aprendiz limit ? offset ?";
  bd.query(query_count, (error, totalaprendices) => {
    bd.query(query, [limite, offset],(error, aprendiz)=>{
      if (error){
        res.send({
          status: "error",
          mensaje: "ocurrió un error en la consulta",
          error: error,
        })
      } else {
        res.send({
          status: "ok",
          mensaje: "consulta exitosa",
          aprendiz: aprendiz
        })
      }
      })
    })
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

// actualización de la imagen en la api 
// validar la extensión del archivo
// subir el archivo a la carpeta uploads con el nombre correspondiente

aprendiz.put("/api/aprendiz/subirimagen/:id", 
  [upload.single("foto")], 
  (req, res) => {
    //validar que llegue el archivo
    if (!req.file ){
      res.status(404).send({
        status: "no",
        mensaje: "debe seleccionar un archivo válido!"
      });
    }
    // obtener la extension del archivo
    let archivo = req.file.originalname;
    let archivoSplit = archivo.split(".");
    let extension = archivoSplit[1]; 

    if(extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "webp"){
      fs.unlink(req.file.path, (error) => {
        res.status(404).send({
          status: "error",
          mensaje: "formato de imagen inválido"
        })
        
      });
    } 
      let id = req.params.id;
      let foto = req.file.filename;
      bd.query("UPDATE aprendiz SET foto = ? WHERE id = ?",[foto, id],(error, datas)=>{
        if(error){
          res.status(404).send({
            status: "error",
            mensaje: "no fue posible ejeccutar la consulta",
          })
        } else {
          res.status(200).send({
            status: ok,
            mensaje: "imagen actualizada",
            data: datas,
          })
        }
      })
    });

// devolver la imagen de la api

aprendiz.get("/api/aprendiz/getimagen/:foto", (req, res) =>{
  let foto = req.params.foto;

  // validamos la solicitud

  if (!foto) {
    res.status(404).status({
      status: "error",
      mensaje: "debe ingresar un archivo",
    });
  }else {
    res.send({
      ruta: "http://localhost/4100:/uploads/images/" + foto,
    });
  }
});


module.exports = aprendiz;
