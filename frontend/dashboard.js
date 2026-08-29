function logout() {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
        return;
    }

    // Remove login information
    localStorage.removeItem("userRole");
    localStorage.removeItem("selectedPatientId");

    // Go to login page
    window.location.href = "login.html";
}