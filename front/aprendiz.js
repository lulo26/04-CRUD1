// interacciones con la tabla aprendiz
let contenido = document.querySelector("#contenido");
let frmAprendiz = document.querySelector("#frmAprendiz");
let nombre = document.querySelector("#nombre");
let apellido = document.querySelector("#apellido");
let email = document.querySelector("#email");
let password = document.querySelector("#password");

//llamamos el metodo de creacion modal de bootstrap
const frmCrearAprendiz = new bootstrap.Modal(
  document.getElementById("frmCrearAprendiz")
);
let btnNuevo = document.querySelector("#btnNuevo");

let api = "http://localhost:4100/api/aprendiz/";

let accion = "";

/*
funcion necesaria para capturar el evento click por cada 
fila de una tabla
y obtener el id
element : elemento html
event : evento que desencadena (el evento en si mismo)
selector : id o clase del elemento
handler : manejor del evento (click, onclick)
*/
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

on(document, "click", ".btnBorrar", (e) => {
  console.log("click en mi!");
  let fila = e.target.parentNode.parentNode.parentNode;
  let idform = fila.firstElementChild.innerText;
  let respuesta = window.confirm(
    `seguro que desea eliminar el registro con id: ${idform}`
  );
  console.log(idform);

  if (respuesta) {
    fetch(api + "borrarporid/" + idform, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        location.reload();
      });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  listartodos();
});

btnNuevo.addEventListener("click", () => {
  frmCrearAprendiz.show();
});

function listartodos() {
  fetch(api + "listartodos")
    .then((res) => res.json())
    .then((res) => {
      /*  for (let index = 0; index < res.aprendiz.length; index++) {
     contenido.innerHTML +=   `${res.aprendiz[index].nombre} ${res.aprendiz[index].apellido} <br>`
    }
 
    res.aprendiz.map((aprendiz)=>{
      contenido.innerHTML +=   `${aprendiz.nombre} ${aprendiz.apellido} <br>`
    }) */
      res.aprendiz.forEach((aprendiz) => {
        let fila = `<tr>
        <td>${aprendiz.id}</td>
        <td>${aprendiz.nombre}</td>
        <td>${aprendiz.apellido}</td>
        <td>${aprendiz.email}</td>
        <td><button class="btnBorrar btn btn-danger"><i class="bi bi-trash"></i></button></td>
        <td><button class="btnEditar btn btn-secondary"><i class="bi bi-pencil-square"></i></button></td>
        </tr><br>`;
        contenido.innerHTML += fila;
      });
    });
}
// envia datos por el formulario, el request lleva una payload que es la data de los formularios,
// metodo post

frmAprendiz.addEventListener("submit", (e) => {
  // previene el evento por defecto de los formularios que hace submit automatico
  // evitamos enviar espacios vacios y controlamos el envio desde el boton enviar
  e.preventDefault();
  fetch(api + "crear", {
    method: "POST",
    // configuramos que la cabecera, header de peticion lleve una configuracion: contiene un archivo json
    headers: {
      "Content-Type": "application/json",
    },
    //carga o payload del request o peticion, serializar un objeto JS  a JSON
    body: JSON.stringify({
      nombre: nombre.value,
      apellido: apellido.value,
      email: email.value,
      password: password.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.status, res.respuesta);
      alert("exito");
      frmCrearAprendiz.hide();
      location.reload();
    });
});
