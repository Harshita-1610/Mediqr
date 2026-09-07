/* =====================================================
   MEDIQR LOGIN
   ===================================================== */

let selectedRole = "patient";


/* =====================================================
   SELECT ROLE
   ===================================================== */

function selectRole(role) {

    selectedRole = role;

    const patientRole = document.getElementById("patientRole");
    const doctorRole = document.getElementById("doctorRole");

    // Remove active from both
    patientRole.classList.remove("active");
    doctorRole.classList.remove("active");

    // Add active to selected role
    if (role === "patient") {
        patientRole.classList.add("active");
    }

    if (role === "doctor") {
        doctorRole.classList.add("active");
    }

    // Change Register link
    const registerLink = document.getElementById("registerLink");

    if (registerLink) {

        if (role === "patient") {
            registerLink.href = "register.html";
        }

        if (role === "doctor") {
            registerLink.href = "doctor-register.html";
        }
    }
}


/* =====================================================
   PASSWORD SHOW / HIDE
   ===================================================== */

function togglePassword() {

    const password = document.getElementById("password");
    const eye = document.querySelector(".password-eye");

    if (password.type === "password") {

        password.type = "text";

        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        eye.classList.remove("fa-eye-slash");
        eye.classList.add("fa-eye");
    }
}


/* =====================================================
   LOGIN FORM
   ===================================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        // Stop normal HTML form submission
        event.preventDefault();

        // Get values
        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        /* ---------------------------------------------
           Check empty fields
           --------------------------------------------- */

        if (!email || !password) {

            alert("Please enter email and password.");

            return;
        }


        /* ---------------------------------------------
           Send login data to Flask backend
           --------------------------------------------- */

        try {

            const response = await fetch("/api/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    email: email,

                    password: password,

                    role: selectedRole

                })

            });


            /* -----------------------------------------
               Convert backend response to JSON
               ----------------------------------------- */

            const data = await response.json();


            /* -----------------------------------------
               Check backend response
               ----------------------------------------- */

            if (data.success) {

                alert(
                    data.message +
                    "\nRole: " +
                    data.role
                );


                /* -------------------------------------
                   Redirect according to role
                   ------------------------------------- */

                if (selectedRole === "patient") {

                    window.location.href =
                        "dashboard.html";

                }

                else if (selectedRole === "doctor") {

                    window.location.href =
                        "doctor-dashboard.html";

                }

            }

            else {

                alert(
                    data.message ||
                    "Login failed."
                );

            }

        }

        catch (error) {

            console.error("Login Error:", error);

            alert(
                "Unable to connect to MediQR backend."
            );

        }

    });
}