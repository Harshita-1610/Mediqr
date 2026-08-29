// ====================================
// MediQR QR Page
// ====================================

document.addEventListener("DOMContentLoaded",()=>{

const patientID="MQ2026001";

// Download QR
document.getElementById("downloadBtn")
.addEventListener("click",()=>{

alert("QR Download will work after backend integration.");

});

// Print

document.getElementById("printBtn")
.addEventListener("click",()=>{

window.print();

});

// Share

document.getElementById("shareBtn")
.addEventListener("click",()=>{

if(navigator.share){

navigator.share({

title:"My MediQR",

text:"My Medical QR",

url:window.location.href

});

}else{

alert("Sharing is not supported on this browser.");

}

});

// Copy Patient ID

document.getElementById("copyBtn")
.addEventListener("click",()=>{

navigator.clipboard.writeText(patientID);

alert("Patient ID copied successfully!");

});

});