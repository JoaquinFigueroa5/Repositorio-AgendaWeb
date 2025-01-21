function redirectToPage(event) {
    event.preventDefault();
    const username = document.querySelector('input[placeholder="Username"]').value.trim();
    const password = document.querySelector('input[placeholder="Password"]').value.trim();
    //const remember = document.getElementById('rememberMe').checked;

    if (username === "" || password === "") {
        alert("Por favor, llena todos los campos.")
    } else {
        window.location.href = "contacts.html";
    }

/*    if (remember) {
        localStorage.setItem("useername", username)
        localStorage.setItem("password", password)
    } else {
        localStorage.removeItem("username")
    }

}

window.onload = function (){
    const savedUsername = localStorage.getItem('input[placeholder="Username"]');
    const savedPassword = localStorage.getItem('input[placeholder="Password"]')
    if (savedUsername && savedPassword) {
        document.getElementById("username").value = savedUsername;
        document.getElementByI("rememberMe").checked = true;
    }
        */
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
    document.getElementById("upload-photo").value = ""; // Resetea el input
  };
  
  function showAlert(alertId){
    document.getElementById(alertId).style.display = "flex";
  }

  function closeAlert(alertId){
    document.getElementById(alertId).style.display = "none";
  }
  
