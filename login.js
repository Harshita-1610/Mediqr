/* =====================================================
   LOGIN
   ===================================================== */

let selectedRole = "patient";


/* =====================================================
   SELECT ROLE
   ===================================================== */

function selectRole(role){

    selectedRole = role;


    const patientRole =
        document.getElementById("patientRole");

    const doctorRole =
        document.getElementById("doctorRole");


    /* Remove active */

    patientRole.classList.remove("active");
    doctorRole.classList.remove("active");


    /* Add active */

    if(role === "patient"){

        patientRole.classList.add("active");

    }
    else if(role === "doctor"){

        doctorRole.classList.add("active");

    }


    /* Change Register link */

    const registerLink =
        document.getElementById("registerLink");


    if(registerLink){

        if(role === "patient"){

            registerLink.href = "register.html";

        }
        else if(role === "doctor"){

            registerLink.href = "doctor-register.html";

        }

    }

}



/* =====================================================
   PASSWORD SHOW / HIDE
   ===================================================== */

function togglePassword(){

    const password =
        document.getElementById("password");

    const eye =
        document.querySelector(".password-eye");


    if(password.type === "password"){

        password.type = "text";

        eye.classList.remove("fa-eye");

        eye.classList.add("fa-eye-slash");

    }
    else{

        password.type = "password";

        eye.classList.remove("fa-eye-slash");

        eye.classList.add("fa-eye");

    }

}



/* =====================================================
   LOGIN FORM
   ===================================================== */

const loginForm =
    document.getElementById("loginForm");


if(loginForm){

    loginForm.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const email =
                document.getElementById("email").value.trim();


            const password =
                document.getElementById("password").value;


            if(!email || !password){

                alert("Please enter email and password.");

                return;

            }


            /* ================= PATIENT ================= */

            if(selectedRole === "patient"){

                alert("Patient login successful!");

                window.location.href =
                    "dashboard.html";

            }


            /* ================= DOCTOR ================= */

            else if(selectedRole === "doctor"){

                alert("Doctor login successful!");

                window.location.href =
                    "doctor-dashboard.html";

            }

        }
    );

}