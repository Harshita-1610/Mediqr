// ================================
// MediQR Register Page
// ================================

const form = document.querySelector("form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const password = document.querySelectorAll("input[type='password']")[0].value;
    const confirmPassword = document.querySelectorAll("input[type='password']")[1].value;

    if(password !== confirmPassword){

        alert("Passwords do not match!");
        return;

    }

    alert("Registration Successful! Please Login.");

    window.location.href = "login.html";

});