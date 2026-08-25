// ======================================
// MediQR Settings
// ======================================


// Navigation

function goTo(page) {

    window.location.href = page;

}


// Change Password

function changePassword() {

    const newPassword =
        prompt("Enter your new password:");

    if (newPassword === null) {
        return;
    }

    if (newPassword.trim().length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        return;
    }

    alert(
        "Password updated successfully!"
    );

}


// Logout

function logout() {

    const confirmLogout =
        confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
        return;
    }

    localStorage.removeItem("userRole");
    localStorage.removeItem("selectedPatientId");

    window.location.href =
        "login.html";

}