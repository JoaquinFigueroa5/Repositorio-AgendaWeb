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
