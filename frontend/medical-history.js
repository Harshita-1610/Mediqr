/* =====================================================
   ADD REPORT MODAL
   ===================================================== */

function openReportModal(){

    const modal = document.getElementById("reportModal");

    if(modal){
        modal.style.display = "flex";
    }

}


function closeReportModal(){

    const modal = document.getElementById("reportModal");

    if(modal){
        modal.style.display = "none";
    }

}



/* =====================================================
   UPLOAD REPORT
   ===================================================== */

const reportForm = document.getElementById("reportForm");

if(reportForm){

    reportForm.addEventListener("submit", function(event){

        event.preventDefault();

        const reportName =
            document.getElementById("reportName").value;

        const reportDate =
            document.getElementById("reportDate").value;

        const reportFile =
            document.getElementById("reportFile").files[0];

        if(!reportName || !reportDate || !reportFile){

            alert("Please fill all report details.");

            return;

        }

        const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png"
        ];

        if(!allowedTypes.includes(reportFile.type)){

            alert(
                "Only PDF, JPG, JPEG and PNG files are allowed."
            );

            return;

        }

        alert("Medical report uploaded successfully!");

        closeReportModal();

        reportForm.reset();

    });

}



/* =====================================================
   VIEW REPORT
   ===================================================== */

function viewReport(reportName){

    const modal =
        document.getElementById("reportViewModal");

    const reportTitle =
        document.getElementById("displayReportName");

    if(reportTitle){

        reportTitle.innerText = reportName;

    }

    if(modal){

        modal.style.display = "flex";

    }

}



/* =====================================================
   CLOSE REPORT
   ===================================================== */

function closeReportView(){

    const modal =
        document.getElementById("reportViewModal");

    if(modal){

        modal.style.display = "none";

    }

}



/* =====================================================
   VIEW PRESCRIPTION
   ===================================================== */

function viewPrescription(prescriptionName){

    /*
       Remove old prescription modal if it already exists
    */

    const oldModal =
        document.getElementById("prescriptionViewModal");

    if(oldModal){
        oldModal.remove();
    }


    /*
       Prescription data
    */

    let prescriptionDate = "20 July 2026";
    let doctorName = "Dr. Amit Sharma";
    let hospitalName = "City Hospital";
    let diagnosis = "General Checkup";


    if(prescriptionName.includes("10 Jul")){

        prescriptionDate = "10 July 2026";
        doctorName = "Dr. Priya";
        hospitalName = "City Hospital";
        diagnosis = "Infection";

    }


    if(prescriptionName.includes("02 Jul")){

        prescriptionDate = "02 July 2026";
        doctorName = "Dr. Rahul";
        hospitalName = "City Hospital";
        diagnosis = "Health Screening";

    }


    /*
       Create modal
    */

    const modal =
        document.createElement("div");

    modal.id = "prescriptionViewModal";


    /*
       Modal HTML
    */

    modal.innerHTML = `

        <div class="prescription-modal-box">

            <div class="prescription-modal-header">

                <div>

                    <h2>
                        <i class="fa-solid fa-pills"></i>
                        Medical Prescription
                    </h2>

                    <p>
                        Prescription provided by your doctor
                    </p>

                </div>

                <button
                    class="prescription-close"
                    onclick="closePrescriptionView()">

                    <i class="fa-solid fa-xmark"></i>

                </button>

            </div>


            <div class="prescription-info">

                <div class="info-item">

                    <span>Patient Name</span>

                    <strong>Harshita Shah</strong>

                </div>


                <div class="info-item">

                    <span>Prescription Date</span>

                    <strong>${prescriptionDate}</strong>

                </div>


                <div class="info-item">

                    <span>Doctor</span>

                    <strong>${doctorName}</strong>

                </div>


                <div class="info-item">

                    <span>Hospital</span>

                    <strong>${hospitalName}</strong>

                </div>


                <div class="info-item">

                    <span>Diagnosis</span>

                    <strong>${diagnosis}</strong>

                </div>


                <div class="info-item">

                    <span>Status</span>

                    <strong class="prescription-active">
                        Active
                    </strong>

                </div>

            </div>


            <div class="prescription-medicines">

                <h3>
                    <i class="fa-solid fa-capsules"></i>
                    Prescribed Medicines
                </h3>


                <div class="prescription-table-wrapper">

                    <table>

                        <thead>

                            <tr>

                                <th>Medicine</th>
                                <th>Dosage</th>
                                <th>Morning</th>
                                <th>Afternoon</th>
                                <th>Night</th>
                                <th>Duration</th>

                            </tr>

                        </thead>


                        <tbody>

                            <tr>

                                <td>Paracetamol</td>

                                <td>500 mg</td>

                                <td>✓</td>

                                <td>—</td>

                                <td>✓</td>

                                <td>5 Days</td>

                            </tr>


                            <tr>

                                <td>Vitamin D3</td>

                                <td>1 Tablet</td>

                                <td>✓</td>

                                <td>—</td>

                                <td>—</td>

                                <td>30 Days</td>

                            </tr>


                            <tr>

                                <td>Calcium</td>

                                <td>1 Tablet</td>

                                <td>—</td>

                                <td>—</td>

                                <td>✓</td>

                                <td>15 Days</td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>


            <div class="doctor-instructions">

                <h3>

                    <i class="fa-solid fa-notes-medical"></i>

                    Doctor's Instructions

                </h3>

                <ul>

                    <li>
                        Take medicines after meals.
                    </li>

                    <li>
                        Drink sufficient water.
                    </li>

                    <li>
                        Complete the prescribed course.
                    </li>

                    <li>
                        Follow the doctor's instructions.
                    </li>

                    <li>
                        Visit the doctor again if symptoms continue.
                    </li>

                </ul>

            </div>


            <div class="prescription-permission">

                <i class="fa-solid fa-circle-info"></i>

                <span>
                    This prescription is provided by the doctor.
                    You can view it but cannot edit it.
                </span>

            </div>


            <div class="prescription-modal-actions">

                <button
                    class="print-prescription-btn"
                    onclick="printPrescription()">

                    <i class="fa-solid fa-print"></i>
                    Print Prescription

                </button>


                <button
                    class="close-prescription-btn"
                    onclick="closePrescriptionView()">

                    Close

                </button>

            </div>

        </div>

    `;


    /*
       Add modal to page
    */

    document.body.appendChild(modal);


    /*
       Show modal
    */

    modal.style.display = "flex";


    /*
       Add styling directly so it works
       even if CSS is missing
    */

    const style =
        document.createElement("style");

    style.id = "prescriptionModalStyle";

    style.innerHTML = `

        #prescriptionViewModal{

            position:fixed;

            inset:0;

            background:rgba(15,23,42,0.60);

            display:flex;

            align-items:center;

            justify-content:center;

            padding:25px;

            z-index:9999;

            overflow-y:auto;

            font-family:'Poppins',sans-serif;

        }


        .prescription-modal-box{

            width:900px;

            max-width:95%;

            max-height:92vh;

            overflow-y:auto;

            background:white;

            border-radius:20px;

            box-shadow:0 20px 50px rgba(0,0,0,0.25);

            padding:30px;

        }


        .prescription-modal-header{

            display:flex;

            justify-content:space-between;

            align-items:flex-start;

            padding-bottom:20px;

            border-bottom:1px solid #e5e7eb;

        }


        .prescription-modal-header h2{

            margin:0;

            color:#1e293b;

            font-size:25px;

        }


        .prescription-modal-header h2 i{

            color:#2563eb;

            margin-right:8px;

        }


        .prescription-modal-header p{

            margin:6px 0 0;

            color:#64748b;

            font-size:14px;

        }


        .prescription-close{

            border:none;

            background:#f1f5f9;

            width:38px;

            height:38px;

            border-radius:50%;

            cursor:pointer;

            font-size:18px;

        }


        .prescription-close:hover{

            background:#fee2e2;

            color:#dc2626;

        }


        .prescription-info{

            display:grid;

            grid-template-columns:repeat(3,1fr);

            gap:18px;

            padding:25px 0;

        }


        .info-item{

            background:#f8fafc;

            padding:15px;

            border-radius:12px;

        }


        .info-item span{

            display:block;

            color:#64748b;

            font-size:13px;

            margin-bottom:5px;

        }


        .info-item strong{

            color:#1e293b;

            font-size:15px;

        }


        .prescription-active{

            color:#15803d !important;

        }


        .prescription-medicines h3,
        .doctor-instructions h3{

            color:#1e293b;

            margin-bottom:15px;

        }


        .prescription-medicines h3 i,
        .doctor-instructions h3 i{

            color:#2563eb;

            margin-right:7px;

        }


        .prescription-table-wrapper{

            overflow-x:auto;

        }


        .prescription-table-wrapper table{

            width:100%;

            border-collapse:collapse;

        }


        .prescription-table-wrapper th{

            background:#2563eb;

            color:white;

            padding:13px;

            text-align:left;

            font-size:13px;

        }


        .prescription-table-wrapper td{

            padding:13px;

            border-bottom:1px solid #e5e7eb;

            color:#334155;

            font-size:14px;

        }


        .prescription-table-wrapper tr:hover{

            background:#f8fafc;

        }


        .doctor-instructions{

            margin-top:25px;

            background:#f8fafc;

            padding:20px;

            border-radius:14px;

        }


        .doctor-instructions ul{

            margin:0;

            padding-left:22px;

            color:#475569;

        }


        .doctor-instructions li{

            margin-bottom:8px;

        }


        .prescription-permission{

            display:flex;

            gap:10px;

            align-items:center;

            background:#eff6ff;

            color:#1e40af;

            padding:14px;

            border-radius:10px;

            margin-top:20px;

            font-size:13px;

        }


        .prescription-modal-actions{

            display:flex;

            justify-content:flex-end;

            gap:10px;

            margin-top:25px;

        }


        .print-prescription-btn{

            border:none;

            background:#2563eb;

            color:white;

            padding:11px 18px;

            border-radius:9px;

            cursor:pointer;

        }


        .close-prescription-btn{

            border:none;

            background:#e2e8f0;

            color:#334155;

            padding:11px 20px;

            border-radius:9px;

            cursor:pointer;

        }


        .print-prescription-btn:hover{

            background:#1d4ed8;

        }


        .close-prescription-btn:hover{

            background:#cbd5e1;

        }


        @media(max-width:700px){

            .prescription-info{

                grid-template-columns:1fr;

            }

            .prescription-modal-box{

                padding:20px;

            }

        }

    `;


    document.head.appendChild(style);

}



/* =====================================================
   CLOSE PRESCRIPTION
   ===================================================== */

function closePrescriptionView(){

    const modal =
        document.getElementById("prescriptionViewModal");

    if(modal){

        modal.remove();

    }

}



/* =====================================================
   PRINT PRESCRIPTION
   ===================================================== */

function printPrescription(){

    const prescription =
        document.querySelector(".prescription-modal-box");

    if(!prescription){

        return;

    }


    const printWindow =
        window.open("", "_blank", "width=900,height=700");


    printWindow.document.write(`

        <html>

        <head>

            <title>Medical Prescription</title>

            <style>

                body{

                    font-family:Arial,sans-serif;

                    padding:30px;

                    color:#222;

                }

                h2{

                    color:#1e40af;

                }

                table{

                    width:100%;

                    border-collapse:collapse;

                    margin-top:20px;

                }

                th,td{

                    border:1px solid #ddd;

                    padding:10px;

                    text-align:left;

                }

                th{

                    background:#2563eb;

                    color:white;

                }

                .info{

                    display:grid;

                    grid-template-columns:1fr 1fr;

                    gap:12px;

                    margin:20px 0;

                }

                .instructions{

                    margin-top:20px;

                    padding:15px;

                    background:#f3f4f6;

                }

            </style>

        </head>

        <body>

            ${prescription.innerHTML}

        </body>

        </html>

    `);


    printWindow.document.close();

    printWindow.focus();

    printWindow.print();

}



/* =====================================================
   SEARCH
   ===================================================== */

const searchMedical =
    document.getElementById("searchMedical");

if(searchMedical){

    searchMedical.addEventListener("keyup", function(){

        const searchValue =
            this.value.toLowerCase();

        const rows =
            document.querySelectorAll(
                "#medicalTable tbody tr"
            );

        rows.forEach(function(row){

            const rowText =
                row.innerText.toLowerCase();

            if(rowText.includes(searchValue)){

                row.style.display = "";

            }
            else{

                row.style.display = "none";

            }

        });

    });

}



/* =====================================================
   CLOSE MODALS ON OUTSIDE CLICK
   ===================================================== */

window.addEventListener("click", function(event){

    const reportModal =
        document.getElementById("reportModal");

    const reportViewModal =
        document.getElementById("reportViewModal");


    if(event.target === reportModal){

        closeReportModal();

    }


    if(event.target === reportViewModal){

        closeReportView();

    }

});



/* =====================================================
   LOGOUT
   ===================================================== */

function logout(){

    const confirmLogout =
        confirm("Are you sure you want to logout?");

    if(confirmLogout){

        window.location.href = "login.html";

    }

}



/* =====================================================
   DOWNLOAD REPORT
   ===================================================== */

function downloadReport(){

    const image =
        document.getElementById("reportPreviewImage");

    if(!image || !image.src){

        alert("Report is not available.");

        return;

    }

    const link =
        document.createElement("a");

    link.href = image.src;

    link.download = "Medical-Report.jpg";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}