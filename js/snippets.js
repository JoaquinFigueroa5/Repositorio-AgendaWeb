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

  // Verificar si el nombre es "Urgente" para agregar la clase de color rojo
  const nombreClass = nombre.toLowerCase() === 'URGENTE' ? 'text-red' : '';

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
  

  if (checkboxes.length === 0) {
    alert('No hay pendientes seleccionados para eliminar.');
    return;
  }

  // Eliminar los pendientes que estén marcados
  checkboxes.forEach((checkbox) => {
    const li = checkbox.closest('li');
    const index = li.getAttribute('data-index');
    
    // Eliminar el pendiente correspondiente del array de pendientes
    pendientes.splice(index, 1);
    
    // Eliminar el elemento del DOM
    li.remove();
  });

  alert('Pendientes eliminados correctamente.');
  location.reload();

  // Actualizar el localStorage con los pendientes restantes
  localStorage.setItem('pendientes', JSON.stringify(pendientes));
}

function ordenarPendientes() {
  const orderSelect = document.getElementById('orderSelect');
  const listaPendientes = document.getElementById('taskList');
  const pendientes = Array.from(listaPendientes.children); // Convertir los elementos en un array

  if (orderSelect.value === "asc") {
    // Ordenar colocando los elementos con "Urgente" primero
    pendientes.sort((a, b) => {
      const nombreA = a.querySelector('.fw-bold').textContent.trim().toLowerCase();
      const nombreB = b.querySelector('.fw-bold').textContent.trim().toLowerCase();

      if (nombreA === "urgente" && nombreB !== "urgente") return -1;
      if (nombreA !== "urgente" && nombreB === "urgente") return 1;
      return 0;
    });
  } else if (orderSelect.value === "desc") {
    // Ordenar colocando los elementos con "Urgente" al final
    pendientes.sort((a, b) => {
      const nombreA = a.querySelector('.fw-bold').textContent.trim().toLowerCase();
      const nombreB = b.querySelector('.fw-bold').textContent.trim().toLowerCase();

      if (nombreA === "urgente" && nombreB !== "urgente") return 1;
      if (nombreA !== "urgente" && nombreB === "urgente") return -1;
      return 0;
    });
  }

  // Vaciar y reinsertar los elementos ordenados
  listaPendientes.innerHTML = '';
  pendientes.forEach((pendiente) => listaPendientes.appendChild(pendiente));
}

function reiniciarPag() {
  location.reload();
}

// Función para resaltar pendientes existentes con nombre "URGENTE"
function resaltarPendientesUrgentes() {
  const pendientes = document.querySelectorAll('.taskList .fw-bold');
  pendientes.forEach((pendiente) => {
    if (pendiente.textContent.trim().toLowerCase() === 'URGENTE') {
      pendiente.classList.add('text-red');
    }
  });
}






  
