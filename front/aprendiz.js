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

btnNuevo.addEventListener("click", () => {
  // limpiar los input
  nombre.value = "";
  apellido.value = "";
  email.value = "";
  accion = "crear";
  frmCrearAprendiz.show();
});

function listartodos() {
  fetch(api + "listartodos")
    .then((res) => res.json())
    .then((res) => {
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

//metodo guardar cambiar para guardar o editar de la accion seleccionada
frmAprendiz.addEventListener("submit", (e) => {
  // previene el evento por defecto de los formularios que hace submit automatico
  // evitamos enviar espacios vacios y controlamos el envio desde el boton enviar
  e.preventDefault();

  // acción nuevo
  if (accion === "crear") {
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
        frmCrearAprendiz.hide();
        location.reload();
      });
  }

  //accion editar
  if (accion === "editar") {
    fetch(api + "crear", {
      method: "PUT",
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
  }

  frmCrearAprendiz.hide();
});

// metodo para llamar el formulario de edición y pasarle los campos a editar
// definimos el id
let idform = "";
on(document, "click", ".btnEditar", (e) => {
  console.log("click en mi!");
  let fila = e.target.parentNode.parentNode.parentNode;
  let idform = fila.children[0].innerText;
  idform = id;
  nombre.value = fila.children[1].innerText;
  apellido.value = fila.children[2].innerText;
  email.value = fila.children[3].innerText;
  accion = "editar";
  frmCrearAprendiz.show();
});

// paginación

let btnPagina1 = document.querySelector("#btnPagina1");
let btnPagina2 = document.querySelector("#btnPagina2");
let btnPagina3 = document.querySelector("#btnPagina3");
let li1 = document.querySelector("#li1");
let li2 = document.querySelector("#li2");
let li3 = document.querySelector("#li3");
let btnAnterior = document.querySelector("#btnAnterior");
let btnSiguiente = document.querySelector("#btnSiguiente");
let limite = 15;
let pagina = 1;
btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina = pagina - 1;
  } else {
    pagina = 67;
  }
  contenido.innerHTML = "";
  listartodos();
});
btnSiguiente.addEventListener("click", () => {
  if (pagina < 67) {
    pagina = pagina + 1;
  } else {
    pagina = 1;
  }
  contenido.innerHTML = "";
  listartodos();
});
btnPagina1.addEventListener("click", () => {
  pagina = parseInt(btnPagina1.innerText);
  contenido.innerHTML = "";
  listartodos();
});
btnPagina2.addEventListener("click", () => {
  pagina = parseInt(btnPagina2.innerText);
  contenido.innerHTML = "";
  listartodos();
});
btnPagina3.addEventListener("click", () => {
  pagina = parseInt(btnPagina3.innerText);
  contenido.innerHTML = "";
  listartodos();
});
function listartodos() {
  fetch(api + "listartodos" + "?limite=" + limite + "&pagina=" + pagina)
    .then((res) => res.json())
    .then((res) => {
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
  if (pagina == 1) {
    btnPagina1.innerText = 1;
    btnPagina2.innerText = 2;
    btnPagina3.innerText = 3;
  } else if (pagina == 67) {
    btnPagina1.innerText = 65;
    btnPagina2.innerText = 66;
    btnPagina3.innerText = 67;
  } else {
    btnPagina1.innerText = pagina - 1;
    btnPagina2.innerText = pagina;
    btnPagina3.innerText = pagina + 1;
  }
  li1.setAttribute("class", "page-item");
  li2.setAttribute("class", "page-item");
  li3.setAttribute("class", "page-item");
  if (btnPagina1.innerText == pagina){
    li1.setAttribute("class", "page-item active");
  } else if (btnPagina2.innerText == pagina){
    li2.setAttribute("class", "page-item active");
  } else if (btnPagina3.innerText == pagina){
    li3.setAttribute("class", "page-item active");
  }
}
listartodos();
