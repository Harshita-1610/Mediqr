// ============================================
// MediQR - Register Page
// ============================================

// Get the registration form
const form = document.querySelector("form");

// Listen when user clicks "Create Account"
form.addEventListener("submit", async function (e) {

    // Stop the HTML form from refreshing the page
    e.preventDefault();

    // Get all form fields
    const fullName = document.getElementById("fullName").value.trim();

    const dateOfBirth =
        document.querySelector("input[type='date']").value;

    const gender =
        document.querySelectorAll("select")[0].value;

    const bloodGroup =
        document.querySelectorAll("select")[1].value;

    const mobile =
        document.querySelectorAll("input[type='text']")[1].value.trim();

    const email =
        document.querySelector("input[type='email']").value.trim();

    const passwords =
        document.querySelectorAll("input[type='password']");

    const password = passwords[0].value;
    const confirmPassword = passwords[1].value;

    const numberInputs =
        document.querySelectorAll("input[type='number']");

    const height = numberInputs[0].value;
    const weight = numberInputs[1].value;

    const textInputs =
        document.querySelectorAll("input[type='text']");

    const allergies = textInputs[2].value.trim();
    const emergencyName = textInputs[3].value.trim();
    const emergencyPhone = textInputs[4].value.trim();

    const address =
        document.querySelector("textarea").value.trim();


    // ============================================
    // 1. Check passwords
    // ============================================

    if (password !== confirmPassword) {

        alert("Passwords do not match!");
        return;

    }


    // ============================================
    // 2. Create registration data
    // ============================================

    const registrationData = {

        full_name: fullName,
        date_of_birth: dateOfBirth,
        gender: gender,
        blood_group: bloodGroup,
        mobile: mobile,
        email: email,
        password: password,
        height: height,
        weight: weight,
        allergies: allergies,
        emergency_name: emergencyName,
        emergency_phone: emergencyPhone,
        address: address

    };


    // ============================================
    // 3. Send data to Flask Backend
    // ============================================

    try {

        const response = await fetch(
            "/api/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(registrationData)
            }
        );


        const result = await response.json();


        // ========================================
        // 4. Check backend response
        // ========================================

        if (result.success) {

            alert(
                "Registration successful! Please login."
            );

            window.location.href = "login.html";

        }
        else {

            alert(
                result.message || "Registration failed."
            );

        }

    }
    catch (error) {

        console.error("Registration error:", error);

        alert(
            "Unable to connect to MediQR backend."
        );

    }

});