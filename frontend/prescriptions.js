// ====================================
// MediQR Prescription Page
// ====================================

document.addEventListener("DOMContentLoaded",()=>{

const search=document.getElementById("searchInput");

search.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

const rows=document.querySelectorAll("tbody tr");

rows.forEach(row=>{

if(row.innerText.toLowerCase().includes(value)){

row.style.display="";

}

else{

row.style.display="none";

}

});

});

// Download Button

document.getElementById("downloadBtn")
.addEventListener("click",()=>{

alert("PDF Download will be connected after Backend.");

});

// Print

document.getElementById("printBtn")
.addEventListener("click",()=>{

window.print();

});

// Previous Prescription

document.querySelectorAll(".viewBtn")
.forEach(button=>{

button.addEventListener("click",()=>{

alert("Previous Prescription Viewer will open after Backend.");

});

});

});