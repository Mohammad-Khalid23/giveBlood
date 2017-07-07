var checkDonor = localStorage.getItem("allDonors");
checkDonor = JSON.parse(checkDonor);
console.log(checkDonor);

for (var i = 0; i < checkDonor.length; i++) {
var table = document.getElementById("donors_table");

var row = table.insertRow(1);
var cell0 = row.insertCell(0);
var cell1 = row.insertCell(1);
var cell2 = row.insertCell(2);
var cell3 = row.insertCell(3);

cell0.innerHTML =checkDonor[i].name;
cell1.innerHTML =checkDonor[i].bloodGroup;
cell2.innerHTML =checkDonor[i].number;
cell3.innerHTML =checkDonor[i].city;


}
    