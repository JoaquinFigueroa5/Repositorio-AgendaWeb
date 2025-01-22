function redirectToPage(event) {
    event.preventDefault();
    const username = document.querySelector('input[placeholder="Username"]').value.trim();
    const password = document.querySelector('input[placeholder="Password"]').value.trim();

    if (username === "" || password === "") {
        alert("Por favor, llena todos los campos.")
    } else {
        window.location.href = "contacts.html";
    }

    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
}

(() => {
    'use strict'
  
    const forms = document.querySelectorAll('.needs-validation')
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


  const previewPhoto = (event) => {
    const photoPreview = document.getElementById("photo-preview");
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        photoPreview.innerHTML = `<img src="${e.target.result}" alt="Foto">`;
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    const photoPreview = document.getElementById("photo-preview");
    photoPreview.innerHTML = `<span class="text-light">No Photo</span>`;
    document.getElementById("upload-photo").value = "";
  };
  
  function showAlert(alertId){
    document.getElementById(alertId).style.display = "flex";
  }

  function closeAlert(alertId){
    document.getElementById(alertId).style.display = "none";
  }

  document.addEventListener('DOMContentLoaded', () => {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    const listItems = document.querySelectorAll('.list-group-item');
    if (username) {
      listItems[1].textContent = username;
    }
    
    if (password) {
      listItems[2].textContent = password;
    }

  });

  document.getElementById("orderSelect").addEventListener("change", function () {
    const list = document.getElementById("taskList");
    const tasks = Array.from(list.children); // Convertir NodeList a Array
    const order = this.value;

    tasks.sort((a, b) => {
      // Extraer los minutos del texto "Last updated X mins ago"
      const timeA = parseInt(a.querySelector("small").textContent.match(/\d+/)[0]);
      const timeB = parseInt(b.querySelector("small").textContent.match(/\d+/)[0]);

      // Ordenar según la opción seleccionada
      return order === "asc" ? timeA - timeB : timeB - timeA;
    });

    // Reorganizar los elementos en el DOM
    tasks.forEach(task => list.appendChild(task));
  });


// Función para cargar pendientes desde localStorage
document.addEventListener("DOMContentLoaded", function() {
  cargarPendientes();
});

// Función para cargar los pendientes desde localStorage al cargar la página
function cargarPendientes() {
  const pendientes = JSON.parse(localStorage.getItem('pendientes')) || [];
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';  // Limpiar la lista antes de agregar nuevos pendientes

  pendientes.forEach((pendiente, index) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
    li.setAttribute('data-index', index);
    
    const contenido = `
      <div class="ms-2">
        <div class="fw-bold">${pendiente.nombre}</div>
        ${pendiente.descripcion}
        <p class="card-text"><small class="text-body-secondary">${pendiente.fecha}</small></p>
      </div>
      <div class="mb-3 form-check" style="margin-top: 15px;">
        <input type="checkbox" class="form-check-input" id="check-${index}" onchange="verificarTarea(this)">
        <label class="form-check-label" for="check-${index}"></label>
      </div>
    `;
    li.innerHTML = contenido;
    taskList.appendChild(li);
  });
}

// Función para agregar un pendiente a la lista
function agregarPendiente() {
  const nombre = document.getElementById('inputEmail3').value;
  const descripcion = document.getElementById('inputPassword3').value;

  if (!nombre || !descripcion) {
    alert('Por favor ingrese el nombre y la descripción.');
    return;
  }

  const fecha = new Date().toLocaleString();

  // Crear el nuevo pendiente
  const nuevoPendiente = { nombre, descripcion, fecha };

  // Obtener los pendientes del localStorage
  const pendientes = JSON.parse(localStorage.getItem('pendientes')) || [];
  
  // Añadir el nuevo pendiente al array de pendientes
  pendientes.push(nuevoPendiente);

  // Guardar el array actualizado en localStorage
  localStorage.setItem('pendientes', JSON.stringify(pendientes));

  // Recargar los pendientes
  cargarPendientes();

  // Limpiar los campos del formulario
  document.getElementById('inputEmail3').value = '';
  document.getElementById('inputPassword3').value = '';
  closeAlert('alertAgregar');
}

// Función para manejar el estado de los checkboxes
function verificarTarea(checkbox) {
  if (checkbox.checked) {
    checkbox.closest('li').style.textDecoration = 'line-through';
  } else {
    checkbox.closest('li').style.textDecoration = 'none';
  }
}

// Función para eliminar los pendientes marcados con el checkbox
function eliminarPendientes() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const pendientes = JSON.parse(localStorage.getItem('pendientes')) || [];
  
  // Eliminar los pendientes que estén marcados
  checkboxes.forEach((checkbox) => {
    const li = checkbox.closest('li');
    const index = li.getAttribute('data-index');
    
    // Eliminar el pendiente correspondiente del array de pendientes
    pendientes.splice(index, 1);
    
    // Eliminar el elemento del DOM
    li.remove();
  });

  // Actualizar el localStorage con los pendientes restantes
  localStorage.setItem('pendientes', JSON.stringify(pendientes));
}

// Función para ordenar los pendientes por hora
function ordenarPendientes() {
  const pendientes = JSON.parse(localStorage.getItem('pendientes')) || [];
  const orderSelect = document.getElementById('orderSelect').value;
  
  if (orderSelect === 'asc') {
    // Orden ascendente por hora
    pendientes.sort((a, b) => a.hora - b.hora);
  } else if (orderSelect === 'desc') {
    // Orden descendente por hora
    pendientes.sort((a, b) => b.hora - a.hora);
  }

  // Guardar el array ordenado en localStorage
  localStorage.setItem('pendientes', JSON.stringify(pendientes));

  // Recargar los pendientes con el nuevo orden
  cargarPendientes();
}

// Función para manejar el estado de los checkboxes
function seleccionarPendiente(checkbox) {
  // Si el checkbox es seleccionado, almacenamos los datos del pendiente
  if (checkbox.checked) {
    const li = checkbox.closest('li');
    const index = li.getAttribute('data-index');
    const pendientes = JSON.parse(localStorage.getItem('pendientes')) || [];
    pendienteSeleccionado = pendientes[index];

    // Llenar los campos de edición con los datos del pendiente seleccionado
    document.getElementById('inputEmail3').value = pendienteSeleccionado.nombre;
    document.getElementById('inputPassword3').value = pendienteSeleccionado.descripcion;
  } else {
    // Si el checkbox es desmarcado, limpiamos los campos de edición
    pendienteSeleccionado = null;
    document.getElementById('inputEmail3').value = '';
    document.getElementById('inputPassword3').value = '';
  }
}

let pendienteSeleccionado = null; // Variable para almacenar el pendiente seleccionado

// Función para manejar el estado de los checkboxes y seleccionar el pendiente
function seleccionarPendiente(checkbox) {
  const li = checkbox.closest('li');
  const index = li.getAttribute('data-index');
  const pendientes = JSON.parse(localStorage.getItem('pendientes')) || [];

  if (checkbox.checked) {
    pendienteSeleccionado = pendientes[index]; // Guardar el pendiente seleccionado
    // Mostrar la alerta de edición
    mostrarAlertaDeEdicion();
  } else {
    pendienteSeleccionado = null; // Limpiar la selección si se desmarca
  }
}

// Función para mostrar la alerta de edición y llenar los campos con los datos del pendiente seleccionado
function mostrarAlertaDeEdicion() {
  if (!pendienteSeleccionado) return;

  // Llenar los campos de la alerta con la información del pendiente
  document.getElementById('inputEmail3').value = pendienteSeleccionado.nombre;
  document.getElementById('inputPassword3').value = pendienteSeleccionado.descripcion;

  // Mostrar la alerta
  document.getElementById('alertAgregar').style.display = 'block';
}

// Función para cerrar la alerta
function closeAlert(alertId) {
  document.getElementById(alertId).style.display = 'none';
}

// Función para editar el pendiente
function editarPendiente() {
  if (!pendienteSeleccionado) {
    alert('Por favor, seleccione un pendiente para editar.');
    return;
  }

  // Obtener los nuevos valores del formulario
  const nuevoNombre = document.getElementById('inputEmail3').value;
  const nuevaDescripcion = document.getElementById('inputPassword3').value;

  // Validar los campos
  if (!nuevoNombre || !nuevaDescripcion) {
    alert('Por favor ingrese el nombre y la descripción.');
    return;
  }

  // Actualizar los datos del pendiente
  pendienteSeleccionado.nombre = nuevoNombre;
  pendienteSeleccionado.descripcion = nuevaDescripcion;

  // Actualizar el localStorage con los nuevos datos
  const pendientes = JSON.parse(localStorage.getItem('pendientes')) || [];
  const index = pendientes.findIndex(p => p.nombre === pendienteSeleccionado.nombre && p.descripcion === pendienteSeleccionado.descripcion);
  pendientes[index] = pendienteSeleccionado;

  // Guardar los pendientes actualizados en localStorage
  localStorage.setItem('pendientes', JSON.stringify(pendientes));

  // Recargar la lista de pendientes
  cargarPendientes();

  // Cerrar la alerta
  closeAlert('alertAgregar');

  // Limpiar los campos del formulario
  document.getElementById('inputEmail3').value = '';
  document.getElementById('inputPassword3').value = '';

  alert('Pendiente actualizado con éxito!');
}




  
