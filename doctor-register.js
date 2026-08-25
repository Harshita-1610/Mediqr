/* =====================================================
   DOCTOR REGISTRATION
   ===================================================== */


const doctorRegisterForm =
    document.getElementById("doctorRegisterForm");


/* =====================================================
   PASSWORD SHOW / HIDE
   ===================================================== */

const togglePassword =
    document.getElementById("togglePassword");

const password =
    document.getElementById("password");


if(togglePassword && password){

    togglePassword.addEventListener("click", function(){

        if(password.type === "password"){

            password.type = "text";

            this.classList.remove("fa-eye");

            this.classList.add("fa-eye-slash");

        }
        else{

            password.type = "password";

            this.classList.remove("fa-eye-slash");

            this.classList.add("fa-eye");

        }

    });

}



/* =====================================================
   MOBILE NUMBER
   ===================================================== */

const mobile =
    document.getElementById("mobile");


if(mobile){

    mobile.addEventListener("input", function(){

        this.value =
            this.value.replace(/\D/g, "");

    });

}



/* =====================================================
   FORM SUBMIT
   ===================================================== */

if(doctorRegisterForm){

    doctorRegisterForm.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const doctorName =
                document.getElementById("doctorName").value.trim();


            const licenseNumber =
                document.getElementById("licenseNumber").value.trim();


            const specialization =
                document.getElementById("specialization").value;


            const qualification =
                document.getElementById("qualification").value.trim();


            const email =
                document.getElementById("email").value.trim();


            const mobileNumber =
                document.getElementById("mobile").value.trim();


            const passwordValue =
                document.getElementById("password").value;



            /* ================= VALIDATION ================= */


            if(
                !doctorName ||
                !licenseNumber ||
                !specialization ||
                !qualification ||
                !email ||
                !mobileNumber ||
                !passwordValue
            ){

                alert(
                    "Please fill all doctor registration details."
                );

                return;

            }



            /* Mobile validation */

            if(mobileNumber.length !== 10){

                alert(
                    "Please enter a valid 10-digit mobile number."
                );

                return;

            }



            /* Password validation */

            if(passwordValue.length < 6){

                alert(
                    "Password must contain at least 6 characters."
                );

                return;

            }



            /* Success */

            alert(
                "Doctor account created successfully!"
            );


            /*
               For now redirect to doctor login.
               Backend/database can be connected later.
            */

            window.location.href =
                "doctor-login.html";

        }
    );

}