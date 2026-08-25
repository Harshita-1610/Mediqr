/* =====================================================
   MEDIQR - DOCTOR DASHBOARD
===================================================== */


/* =====================================================
   DATA
===================================================== */

let patients =
    JSON.parse(localStorage.getItem("mediqr_patients")) || [];

let prescriptions =
    JSON.parse(localStorage.getItem("mediqr_prescriptions")) || [];


/* =====================================================
   DOCTOR INFORMATION
===================================================== */

let doctor =
    JSON.parse(localStorage.getItem("mediqr_doctor")) || {

        name: "Dr. Doctor",
        email: "doctor@example.com",
        specialization: "General Physician"

    };


/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    loadDoctorInfo();
    loadPatients();
    loadPrescriptions();
    updateStatistics();
    loadPatientDropdown();
    loadSettings();

});


/* =====================================================
   DOCTOR INFO
===================================================== */

function loadDoctorInfo() {

    document.getElementById("doctorName").textContent =
        doctor.name;

    document.getElementById("topDoctorName").textContent =
        doctor.name;

    document.getElementById("welcomeDoctor").textContent =
        doctor.name.replace("Dr. ", "");

}


/* =====================================================
   SECTION NAVIGATION
===================================================== */

function showSection(sectionName, clickedButton) {

    document.querySelectorAll(".content-section")
        .forEach(section => {

            section.classList.remove("active");

        });


    document.querySelectorAll(".menu-item")
        .forEach(button => {

            button.classList.remove("active");

        });


    const section =
        document.getElementById(sectionName + "Section");

    if (section) {
        section.classList.add("active");
    }


    if (clickedButton) {
        clickedButton.classList.add("active");
    }


    updatePageTitle(sectionName);

}


function showSectionByName(sectionName) {

    const buttons =
        document.querySelectorAll(".menu-item");


    const index = {

        dashboard: 0,
        patients: 1,
        prescriptions: 2,
        settings: 3

    };


    if (buttons[index[sectionName]]) {

        buttons[index[sectionName]].classList.add("active");

        showSection(
            sectionName,
            buttons[index[sectionName]]
        );

    }

}


function updatePageTitle(sectionName) {

    const titles = {

        dashboard: [
            "Dashboard",
            "Welcome back, Doctor"
        ],

        patients: [
            "Patients",
            "Manage your patients and medical records"
        ],

        prescriptions: [
            "Prescriptions",
            "Manage patient prescriptions"
        ],

        settings: [
            "Settings",
            "Manage your doctor profile"
        ]

    };


    if (!titles[sectionName]) return;


    document.getElementById("pageTitle").textContent =
        titles[sectionName][0];

    document.getElementById("pageSubtitle").textContent =
        titles[sectionName][1];

}


/* =====================================================
   PATIENT MODAL
===================================================== */

function openAddPatientModal() {

    const form =
        document.getElementById("patientForm");

    if (form) {
        form.reset();
    }


    document.getElementById("patientModal")
        .classList.add("show");

}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {
        modal.classList.remove("show");
    }

}


/* =====================================================
   ADD PATIENT
===================================================== */

const patientForm =
    document.getElementById("patientForm");


if (patientForm) {

    patientForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const patient = {

            id: generatePatientID(),

            name:
                document.getElementById("patientName")
                    .value.trim(),

            age:
                document.getElementById("patientAge")
                    .value,

            gender:
                document.getElementById("patientGender")
                    .value,

            phone:
                document.getElementById("patientPhone")
                    .value.trim(),

            email:
                document.getElementById("patientEmail")
                    .value.trim(),

            medicalHistory:
                document.getElementById("patientHistory")
                    .value.trim(),

            reports: [],

            createdAt:
                new Date().toISOString()

        };


        patients.push(patient);

        savePatients();

        loadPatients();

        updateStatistics();

        loadPatientDropdown();

        closeModal("patientModal");


        alert("Patient added successfully!");

    });

}


/* =====================================================
   GENERATE PATIENT ID
===================================================== */

function generatePatientID() {

    return "PT" +
        Date.now().toString().slice(-6);

}


/* =====================================================
   SAVE PATIENTS
===================================================== */

function savePatients() {

    localStorage.setItem(
        "mediqr_patients",
        JSON.stringify(patients)
    );

}


/* =====================================================
   LOAD PATIENTS
===================================================== */

function loadPatients() {

    const table =
        document.getElementById("patientsTable");

    const recentTable =
        document.getElementById("recentPatientsTable");


    if (!table || !recentTable) return;


    table.innerHTML = "";

    recentTable.innerHTML = "";


    if (patients.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    No patients found.
                </td>
            </tr>
        `;


        recentTable.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No patients found.
                </td>
            </tr>
        `;

        return;

    }


    patients.forEach(patient => {

        table.innerHTML += `

            <tr>

                <td>${escapeHTML(patient.id)}</td>

                <td>${escapeHTML(patient.name)}</td>

                <td>${escapeHTML(patient.age)}</td>

                <td>${escapeHTML(patient.gender)}</td>

                <td>${escapeHTML(patient.phone)}</td>

                <td>

                    <button
                        class="action-btn"
                        onclick="viewPatient('${patient.id}')"
                    >

                        <i class="fa-solid fa-eye"></i>
                        View

                    </button>

                </td>

            </tr>

        `;

    });


    const recentPatients =
        [...patients].reverse().slice(0, 5);


    recentPatients.forEach(patient => {

        recentTable.innerHTML += `

            <tr>

                <td>${escapeHTML(patient.name)}</td>

                <td>${escapeHTML(patient.age)}</td>

                <td>${escapeHTML(patient.gender)}</td>

                <td>${escapeHTML(patient.phone)}</td>

                <td>

                    <button
                        class="action-btn"
                        onclick="viewPatient('${patient.id}')"
                    >
                        View
                    </button>

                </td>

            </tr>

        `;

    });

}


/* =====================================================
   VIEW PATIENT
===================================================== */

function viewPatient(patientID) {

    const patient =
        patients.find(
            p => p.id === patientID
        );


    if (!patient) {

        alert("Patient not found.");

        return;

    }


    const patientPrescriptions =
        prescriptions.filter(
            p => p.patientID === patient.id
        );


    let prescriptionsHTML = "";


    if (patientPrescriptions.length === 0) {

        prescriptionsHTML =
            "<p>No prescriptions available.</p>";

    }
    else {

        prescriptionsHTML =
            patientPrescriptions.map(p => `

                <div class="history-box">

                    <h3>
                        Prescription -
                        ${formatDate(p.date)}
                    </h3>

                    ${p.medicines.map(m => `

                        <p>

                            <strong>
                                ${escapeHTML(m.name)}
                            </strong>

                            -
                            ${escapeHTML(m.dosage)}

                            -
                            ${escapeHTML(m.duration)}

                            <br>

                            <strong>Timing:</strong>
                            ${getTimingText(m)}

                            <br>

                            ${escapeHTML(m.instruction)}

                        </p>

                    `).join("")}

                    <p>

                        <strong>
                            Doctor Notes:
                        </strong>

                        ${escapeHTML(p.notes || "None")}

                    </p>

                </div>

            `).join("");

    }


    document.getElementById("patientDetailsContent")
        .innerHTML = `

        <div class="patient-info-grid">

            <div class="info-box">
                <label>Patient ID</label>
                <p>${escapeHTML(patient.id)}</p>
            </div>

            <div class="info-box">
                <label>Full Name</label>
                <p>${escapeHTML(patient.name)}</p>
            </div>

            <div class="info-box">
                <label>Age</label>
                <p>${escapeHTML(patient.age)}</p>
            </div>

            <div class="info-box">
                <label>Gender</label>
                <p>${escapeHTML(patient.gender)}</p>
            </div>

            <div class="info-box">
                <label>Phone</label>
                <p>${escapeHTML(patient.phone)}</p>
            </div>

            <div class="info-box">
                <label>Email</label>
                <p>
                    ${escapeHTML(
                        patient.email || "Not provided"
                    )}
                </p>
            </div>

        </div>


        <div class="history-box">

            <h3>

                <i class="fa-solid fa-notes-medical"></i>

                Medical History

            </h3>

            <p>

                ${
                    escapeHTML(
                        patient.medicalHistory ||
                        "No medical history available."
                    )
                }

            </p>

        </div>


        <br>


        <div class="history-box">

            <h3>

                <i class="fa-solid fa-file-medical"></i>

                Medical Reports

            </h3>

            ${
                patient.reports &&
                patient.reports.length > 0

                ? patient.reports.map(report => `

                    <p>

                        <strong>
                            ${escapeHTML(report.name)}
                        </strong>

                        -
                        ${formatDate(report.date)}

                    </p>

                `).join("")

                : "<p>No medical reports available.</p>"
            }

        </div>


        <br>


        <div class="history-box">

            <h3>

                <i class="fa-solid fa-prescription-bottle-medical"></i>

                Prescriptions

            </h3>

            ${prescriptionsHTML}

        </div>

    `;


    document.getElementById("patientDetailsModal")
        .classList.add("show");

}


/* =====================================================
   SEARCH PATIENTS
===================================================== */

function searchPatients() {

    const searchInput =
        document.getElementById("patientSearch");

    if (!searchInput) return;


    const search =
        searchInput.value.toLowerCase();


    const rows =
        document.querySelectorAll(
            "#patientsTable tr"
        );


    rows.forEach(row => {

        const text =
            row.textContent.toLowerCase();


        row.style.display =
            text.includes(search)
                ? ""
                : "none";

    });

}


/* =====================================================
   PRESCRIPTION MODAL
===================================================== */

function openPrescriptionModal() {

    if (patients.length === 0) {

        alert(
            "Please add a patient before creating a prescription."
        );

        return;

    }


    const form =
        document.getElementById("prescriptionForm");

    if (form) {
        form.reset();
    }


    createMedicineRow();


    loadPatientDropdown();


    document.getElementById("prescriptionModal")
        .classList.add("show");

}


/* =====================================================
   PATIENT DROPDOWN
===================================================== */

function loadPatientDropdown() {

    const dropdown =
        document.getElementById("prescriptionPatient");


    if (!dropdown) return;


    dropdown.innerHTML =
        `<option value="">Select Patient</option>`;


    patients.forEach(patient => {

        dropdown.innerHTML += `

            <option value="${escapeHTML(patient.id)}">

                ${escapeHTML(patient.name)}
                (${escapeHTML(patient.id)})

            </option>

        `;

    });

}


/* =====================================================
   CREATE MEDICINE ROW
===================================================== */

function createMedicineRow() {

    const container =
        document.getElementById("medicineContainer");


    if (!container) return;


    const row =
        document.createElement("div");


    row.className =
        "medicine-row";


    row.innerHTML = `

        <input
            type="text"
            class="medicine-name"
            placeholder="Medicine name"
            required
        >


        <input
            type="text"
            class="medicine-dosage"
            placeholder="Dosage"
            required
        >


        <div class="medicine-timing">

            <label>

                <input
                    type="checkbox"
                    class="morning"
                >

                Morning

            </label>


            <label>

                <input
                    type="checkbox"
                    class="afternoon"
                >

                Afternoon

            </label>


            <label>

                <input
                    type="checkbox"
                    class="night"
                >

                Night

            </label>

        </div>


        <input
            type="text"
            class="medicine-duration"
            placeholder="Duration"
            required
        >


        <input
            type="text"
            class="medicine-instruction"
            placeholder="Instructions"
            required
        >


        <button
            type="button"
            class="remove-medicine"
            onclick="removeMedicineRow(this)"
        >

            <i class="fa-solid fa-trash"></i>

        </button>

    `;


    container.appendChild(row);

}


/* =====================================================
   ADD MEDICINE ROW
===================================================== */

function addMedicineRow() {

    createMedicineRow();

}


/* =====================================================
   REMOVE MEDICINE ROW
===================================================== */

function removeMedicineRow(button) {

    const row =
        button.closest(".medicine-row");


    if (!row) return;


    const container =
        document.getElementById("medicineContainer");


    /*
       At least one medicine row should remain.
    */

    if (
        container &&
        container.querySelectorAll(".medicine-row").length <= 1
    ) {

        alert("At least one medicine is required.");

        return;

    }


    row.remove();

}


/* =====================================================
   SAVE PRESCRIPTION
===================================================== */

const prescriptionForm =
    document.getElementById("prescriptionForm");


if (prescriptionForm) {

    prescriptionForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const patientID =
                document.getElementById(
                    "prescriptionPatient"
                ).value;


            if (!patientID) {

                alert("Please select a patient.");

                return;

            }


            const medicineRows =
                document.querySelectorAll(
                    "#medicineContainer .medicine-row"
                );


            const medicines = [];


            medicineRows.forEach(row => {

                const morning =
                    row.querySelector(".morning");

                const afternoon =
                    row.querySelector(".afternoon");

                const night =
                    row.querySelector(".night");


                medicines.push({

                    name:
                        row.querySelector(
                            ".medicine-name"
                        ).value.trim(),

                    dosage:
                        row.querySelector(
                            ".medicine-dosage"
                        ).value.trim(),

                    morning:
                        morning
                            ? morning.checked
                            : false,

                    afternoon:
                        afternoon
                            ? afternoon.checked
                            : false,

                    night:
                        night
                            ? night.checked
                            : false,

                    duration:
                        row.querySelector(
                            ".medicine-duration"
                        ).value.trim(),

                    instruction:
                        row.querySelector(
                            ".medicine-instruction"
                        ).value.trim()

                });

            });


            const prescription = {

                id:
                    "RX" +
                    Date.now().toString().slice(-6),

                patientID:
                    patientID,

                doctorName:
                    doctor.name,

                date:
                    new Date().toISOString(),

                medicines:
                    medicines,

                notes:
                    document.getElementById(
                        "doctorNotes"
                    ).value.trim()

            };


            prescriptions.push(prescription);


            localStorage.setItem(
                "mediqr_prescriptions",
                JSON.stringify(prescriptions)
            );


            loadPrescriptions();

            updateStatistics();

            closeModal("prescriptionModal");


            alert(
                "Prescription saved successfully!"
            );

        }
    );

}


/* =====================================================
   LOAD PRESCRIPTIONS
===================================================== */

function loadPrescriptions() {

    const table =
        document.getElementById(
            "prescriptionsTable"
        );


    if (!table) return;


    table.innerHTML = "";


    if (prescriptions.length === 0) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    style="text-align:center;"
                >

                    No prescriptions found.

                </td>

            </tr>

        `;

        return;

    }


    prescriptions
        .slice()
        .reverse()
        .forEach(prescription => {


            const patient =
                patients.find(
                    p =>
                        p.id ===
                        prescription.patientID
                );


            const patientName =
                patient
                    ? patient.name
                    : "Unknown Patient";


            table.innerHTML += `

                <tr>

                    <td>
                        ${escapeHTML(
                            prescription.id
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            patientName
                        )}
                    </td>

                    <td>
                        ${formatDate(
                            prescription.date
                        )}
                    </td>

                    <td>
                        ${prescription.medicines.length}
                        medicine(s)
                    </td>

                    <td>

                        <button
                            class="action-btn"
                            onclick="viewPrescription('${prescription.id}')"
                        >

                            <i class="fa-solid fa-eye"></i>

                            View

                        </button>

                    </td>

                </tr>

            `;

        });

}


/* =====================================================
   VIEW PRESCRIPTION
===================================================== */

function viewPrescription(id) {

    const prescription =
        prescriptions.find(
            p => p.id === id
        );


    if (!prescription) {

        alert("Prescription not found.");

        return;

    }


    const patient =
        patients.find(
            p =>
                p.id ===
                prescription.patientID
        );


    const medicines =
        prescription.medicines
            .map(m => `

                <div class="info-box">

                    <label>Medicine</label>

                    <p>
                        ${escapeHTML(m.name)}
                    </p>


                    <label>Dosage</label>

                    <p>
                        ${escapeHTML(m.dosage)}
                    </p>


                    <label>Timing</label>

                    <p>
                        ${getTimingText(m)}
                    </p>


                    <label>Duration</label>

                    <p>
                        ${escapeHTML(m.duration)}
                    </p>


                    <label>Instructions</label>

                    <p>
                        ${escapeHTML(m.instruction)}
                    </p>

                </div>

            `)
            .join("");


    document.getElementById("patientDetailsContent")
        .innerHTML = `

        <div class="history-box">

            <h3>
                Prescription ${escapeHTML(prescription.id)}
            </h3>

            <p>

                <strong>Patient:</strong>

                ${
                    patient
                        ? escapeHTML(patient.name)
                        : "Unknown"
                }

            </p>


            <p>

                <strong>Date:</strong>

                ${formatDate(prescription.date)}

            </p>

        </div>


        <br>


        <div class="patient-info-grid">

            ${medicines}

        </div>


        <div class="history-box">

            <h3>Doctor Notes</h3>

            <p>

                ${
                    escapeHTML(
                        prescription.notes ||
                        "No additional notes."
                    )
                }

            </p>

        </div>

    `;


    document.getElementById(
        "patientDetailsModal"
    ).classList.add("show");

}


/* =====================================================
   GET MEDICINE TIMING
===================================================== */

function getTimingText(medicine) {

    const timings = [];


    if (medicine.morning) {
        timings.push("Morning");
    }


    if (medicine.afternoon) {
        timings.push("Afternoon");
    }


    if (medicine.night) {
        timings.push("Night");
    }


    if (timings.length === 0) {

        return "Not specified";

    }


    return timings.join(", ");

}


/* =====================================================
   STATISTICS
===================================================== */

function updateStatistics() {

    const totalPatients =
        document.getElementById(
            "totalPatients"
        );


    const totalPrescriptions =
        document.getElementById(
            "totalPrescriptions"
        );


    const totalReports =
        document.getElementById(
            "totalReports"
        );


    if (totalPatients) {

        totalPatients.textContent =
            patients.length;

    }


    if (totalPrescriptions) {

        totalPrescriptions.textContent =
            prescriptions.length;

    }


    let reportsCount = 0;


    patients.forEach(patient => {

        if (patient.reports) {

            reportsCount +=
                patient.reports.length;

        }

    });


    if (totalReports) {

        totalReports.textContent =
            reportsCount;

    }

}


/* =====================================================
   SETTINGS
===================================================== */

function loadSettings() {

    const name =
        document.getElementById(
            "settingsDoctorName"
        );

    const email =
        document.getElementById(
            "settingsEmail"
        );

    const specialization =
        document.getElementById(
            "settingsSpecialization"
        );


    if (name) {
        name.value = doctor.name;
    }


    if (email) {
        email.value = doctor.email;
    }


    if (specialization) {
        specialization.value =
            doctor.specialization;
    }

}


const settingsForm =
    document.getElementById("settingsForm");


if (settingsForm) {

    settingsForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            doctor.name =
                document.getElementById(
                    "settingsDoctorName"
                ).value.trim();


            doctor.email =
                document.getElementById(
                    "settingsEmail"
                ).value.trim();


            doctor.specialization =
                document.getElementById(
                    "settingsSpecialization"
                ).value.trim();


            localStorage.setItem(
                "mediqr_doctor",
                JSON.stringify(doctor)
            );


            loadDoctorInfo();


            alert(
                "Settings updated successfully!"
            );

        }
    );

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) return;


    window.location.href =
        "../pages/login.html";

}


/* =====================================================
   DATE FORMAT
===================================================== */

function formatDate(date) {

    if (!date) return "-";


    return new Date(date)
        .toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

}


/* =====================================================
   SECURITY HELPER
===================================================== */

function escapeHTML(value) {

    if (!value) return "";


    return String(value)

        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================================
   CLOSE MODAL OUTSIDE CLICK
===================================================== */

window.addEventListener(
    "click",
    function (event) {

        document.querySelectorAll(".modal")
            .forEach(modal => {

                if (event.target === modal) {

                    modal.classList.remove("show");

                }

            });

    }
);