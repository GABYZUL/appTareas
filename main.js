let form = document.getElementById("form")
let input = document.getElementById("input")
let lista = document.getElementById("lista")
let total = document.getElementById("total")
let contadorTareas = 0;
let data = {};


form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  formValidation()
})

const formValidation = () => {
  if (input.value == "") {
    // input.innerHTML = "El campo esta vacio"
    input.style.border = "3px solid red"
  } else {
    msg.innerHTML = ""
    input.style.border = "3px solid black"
    acceptData()
  }
}

const acceptData = () => {
  data["text"] = input.value;
  contadorTareas = contadorTareas + 1;
  total.innerHTML = `Total: ${contadorTareas}`
  crearTarea()
}


let crearTarea = () => {
  lista.innerHTML += `
  <div class="tarea">
    <span class="tarea-texto">${data.text}</span>
    <span class="options">
      <i onClick="editTarea(this)" class="fas fa-edit editC"></i>
      <i onClick="deleteTarea(this)" class="fas fa-trash-alt"></i>
      <i onClick="completarTarea(this)" class="fas fa-check completeC"></i>
    </span>
  </div>
  `;

  input.value = "";
}

let completarTarea = function (evento) {
  let tareaElement = evento.closest('div');
  let tareaTexto = tareaElement.querySelector('.tarea-texto');
  let checkIcon = tareaElement.querySelector('.fas.fa-check');
  let editButton = tareaElement.querySelector('.editC');
  let cambiarBtn = tareaElement.querySelector('.completeC');

  tareaTexto.classList.toggle('completada');

  if (tareaTexto.classList.contains('completada')) {
    checkIcon.classList.remove('fa-check');
    checkIcon.classList.add('fa-check-circle');
    editButton.classList.add('disabled');
    cambiarBtn.classList.add('disabled');// Deshabilitar el botón al completar la tarea
  } else {
    total.innerHTML = `Total: ${contadorTareas}`;
  }
}

let deleteTarea = function (evento) {
  let tareaElement = evento.parentElement.parentElement;

  if (tareaElement.querySelector('.tarea-texto').classList.contains('completada')) {
    // Si la tarea está completada, y se va a eliminar, restar del contador
    contadorTareas = Math.max(0, contadorTareas - 1);
  }

  total.innerHTML = `Total: ${contadorTareas}`;
  tareaElement.remove();

}

const editTarea = (evento) => {
  contadorTareas -= 1;
  total.innerHTML = `Total: ${contadorTareas}`

  input.value = evento.parentElement.previousElementSibling.innerHTML;
  evento.parentElement.parentElement.remove();
}

// 
// 
// 
// 
// 
// 
// REGISTRO DE LOG
// 
// 
// 
// 
// 
document.addEventListener('DOMContentLoaded', function () {
  const formNueva = document.getElementById('form');
  const mensaje = document.getElementById('mensaje');

  // Evento para agregar una nueva Tarea
  formNueva.addEventListener('submit', function (event) {
    event.preventDefault();
    const tareaText = document.getElementById('input').value;

    fetch('registroTareas.php', {
      method: 'POST',
      body: new URLSearchParams({
        'accion': 'crearTarea',
        'input': tareaText
      })
    })
      .then(response => response.json())
      .then(data => {
        mensaje.textContent = data.mensaje;
        console.log(data.mensaje);
      })
      .catch(error => {
        console.error('Error al agregar tarea:', error);
        mensaje.textContent = 'Error al agregar tarea.';
      });
  });
});
