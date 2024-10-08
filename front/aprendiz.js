// interacciones con la tabla aprendiz

let contenido = document.querySelector("#contenido");
let frmAprendiz = document.querySelector("#frmAprendiz");
let nombre = document.getElementById("#nombre");
let apellido = document.getElementById("#apellido");
let email = document.getElementById("#email");
let password = document.getElementById("#password");

let api = "http://localhost:4100/api/aprendiz/";

function listarTodos() {
  fetch(api + "listartodos")
    .then((res) => res.json())
    .then((res) => {
      alert(res.status);
      alert(res.mensaje);
      /* for (let index = 0; index < res.aprendiz.length; index++) {
        document.innerHTML += `${res.aprendiz[index].nombre} ${res.aprendiz[index].apellido} <br>`;
      } */

      res.aprendiz.map((aprendiz) => {
        contenido.innerHTML += `${aprendiz.nombre} ${aprendiz.apellido} <br>`;
      });
    });
}

frmAprendiz.addEventListener("submit", () => {});

// envia datos por el formulario el request lleva una payload que es de la tada de los formularios,
// método post

function guardar() {
  fetch(api + "crear", {
    method: "POST",
    // configuramos que la cabecera, header de peticion lleve una configuracion: contiene un archivo JSON
    headers: {
      "content-type": "aplication/json",
    },
    // carga a payload del request o peticion, serializar un objeto JS a JSON
    body: JSON.stringify({
      nombre: nombre.value,
      apellido: apellido.value,
      email: email.value,
      password: password.value,
    }),
  });
}
