//fucntion to check login user
function checkLogin() {
    var userCheck = localStorage.getItem("activeUser");
    if (userCheck === "true") {
        showLogout();
    } else {
        showSignup();
    }
}
// function to show logout image when user logged in
function showLogout() {
    document.getElementById("donor_list").style.visibility = "visible";
    var img = document.getElementById("logout_img");
    img.src = "images/logout.png"
    img.setAttribute("width", "25");
    img.setAttribute("height", "20")
    document.getElementById("show_sign").innerHTML = "Logout >>"
}
function showSignup() {
    var img = document.getElementById("logout_img");
    img.src = "images/plus.png"
    document.getElementById("show_sign").innerHTML = "Signup >>"
    document.getElementById("donor_list").style.visibility = "hidden";

}

//hide signup and login form
function hide1() {
    document.getElementById("signup").style.display = "none";
}
function hide2() {
    document.getElementById("login").style.display = "none";
}

//show signup form when click on add  button
document.getElementById("add_donor").addEventListener("click", function () {
    var userCheck = localStorage.getItem("activeUser");
    if (userCheck === "true") {
        alert("Logging out!!!")
        showSignup();//show signup button after click on logout
        localStorage.setItem("activeUser", false)
    } else {
        document.getElementById("signup").style.display = "block";
    }
});

//show login form when click on already login
document.getElementById("show_login").addEventListener("click", function () {
    document.getElementById("login").style.display = "block";
    document.getElementById("signup").style.display = "none";
});

//show and hide side bar tips
document.getElementById("tip1").addEventListener("click", function () {
    var x = document.getElementById('firstTip');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
    document.getElementById('thirdTip').style.display = "none";
    document.getElementById('secondTip').style.display = "none";
});

document.getElementById("tip2").addEventListener("click", function () {
    var x = document.getElementById('secondTip');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
    document.getElementById('firstTip').style.display = "none";
    document.getElementById('thirdTip').style.display = "none";
});

document.getElementById("tip3").addEventListener("click", function () {
    var x = document.getElementById('thirdTip');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
    document.getElementById('firstTip').style.display = "none";
    document.getElementById('secondTip').style.display = "none";

});


//show sigunp message on hover pluss
document.getElementById("add_donor").addEventListener("mouseover", function () {
    document.getElementById("show_sign").style.visibility = "visible";
});
document.getElementById("add_donor").addEventListener("mouseout", function () {
    document.getElementById("show_sign").style.visibility = "hidden";
});

// About Page
var aboutpage = document.getElementById("about");
aboutpage.addEventListener("click", function () {
    aboutpage.style.backgroundColor = "red"
    document.getElementById("about_page").style.display = "block";

});


//Signup Funtion
function signup() {
    var DonorName = document.getElementById("donorName");
    var DonorEmail = document.getElementById("donorEmail");
    var DonorPassword = document.getElementById("donorPassword");
    var DonorNumber = document.getElementById("donorNumber");
    var DonorCity = document.getElementById("donorCity");
    var selectOption = document.getElementById("donorBloodGroup");
    var donorExist = false;

    if (DonorName.value === "" || DonorEmail.value === "" || DonorNumber.value === "" || DonorPassword.value === "" || DonorCity.value === "") {
        alert("Please fil the Form Complete");
    } else {
        if (isNaN(DonorNumber.value)){
            alert("In Contact Number")
        }else {
            var allDonors = localStorage.getItem("allDonors"); // return null or donor's name
            if (allDonors === null) {
                allDonors = [];
                alert("null in storage")
            }
            else {
                allDonors = JSON.parse(allDonors);
            }
            //object of donor
            var donors = {
                name: DonorName.value,
                email: DonorEmail.value,
                password: DonorPassword.value,
                bloodGroup: selectOption.value,
                number: DonorNumber.value,
                city: DonorCity.value
            }
            //checking email exist or not
            for (var i = 0; i < allDonors.length; i++) {
                if (allDonors[i].email === DonorEmail.value) {
                    donorExist = true;
                }
            }
            if (donorExist == true) {
                alert("Email Already Exist");
            }
            else {
                allDonors.push(donors);
                allDonors = JSON.stringify(allDonors);
                localStorage.setItem("allDonors", allDonors);

                //Empty the Signup Form
                DonorName.value = "";
                DonorEmail.value = "";
                DonorPassword.value = ""
                DonorNumber.value = "";
                DonorCity.value = "";

                document.getElementById("signup").style.display = "none"; // hide form after signup
                document.getElementById("login").style.display = "block"; //show login form
            }
        }
    }
}
//login function
function login() {
    var loginEmail = document.getElementById("loginEmail");
    var loginPassword = document.getElementById("loginPassword");

    if (loginEmail.value == "" && loginPassword.value == "") {
        alert("Please Fil the Form Complete")
    } else {

        var checkDonor = localStorage.getItem("allDonors");
        checkDonor = JSON.parse(checkDonor);
        console.log(checkDonor);

        for (var i = 0; i < checkDonor.length; i++) {
            if (checkDonor[i].email === loginEmail.value && checkDonor[i].password === loginPassword.value) {
                localStorage.setItem("activeUser", true);
                checkLogin();
                document.getElementById("donor_list").style.visibility = "visible";
                hide2();
                loginEmail.value = "";
                loginPassword.value = "";

                alert("SuccessFully loggedin!!");
            }
        }
    }
}
// search Donor Function

function search() {
    var searchCity = document.getElementById("searchCity");
    var searchBlood = document.getElementById("searchBloodGroup");

    var checkDonor = localStorage.getItem("allDonors");
    checkDonor = JSON.parse(checkDonor);
    var check = false;

    for (var i = 0; i < checkDonor.length; i++) {
        if (checkDonor[i].city === searchCity.value && checkDonor[i].bloodGroup === searchBlood.value) {
            document.getElementById("indexSection").style.display = "none"
            document.getElementById("searchResult").style.display = "block"

            var table = document.getElementById("search_table");

            var row = table.insertRow(1);
            var cell0 = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);

            cell0.innerHTML = checkDonor[i].name;
            cell1.innerHTML = checkDonor[i].bloodGroup;
            cell2.innerHTML = checkDonor[i].number;
            cell3.innerHTML = checkDonor[i].city;
            check = true;
        }
    }
    if (check == false) {
        alert("sorry No Donor Found")

    }
}
//function to hide section and show tips
var tipHeading = document.getElementById("tipHeading");
var tipContent = document.getElementById("tipContent");
function hideSection() {
    var sideTip = document.getElementById("sideTip");
    var section = document.getElementById("indexSection");
    var section1 = document.getElementById("section");

    if (section1 == null) {
        section.style.display = "none"
    } else {
        section1.style.display = "none"
    }

    sideTip.style.display = "block"
    tipHeading.className = "tipsHeading"
    tipContent.className = "two"
    tipContent.style.textAlign = "left";
    tipContent.style.border = "1px solid lightgray"
}
//function to show tips in section area
function showTip(param) {
    console.log(typeof (param));

    if (param === "more1") {
        hideSection();
        tipHeading.innerHTML = "Donor's Speak"
        tipContent.innerHTML = "I have donated blood more than seven times and have'nt had any problems due to donation. <br> Saad Qamar. <br> <br> I have donated blood on many occasions and believe me while donating I always feel pride from inside, a feeling of saving someone's life is beyond anything else. We all should experiance such feelings in life..........  Kamil Ali <br> <br>I am a regular donor who normally donates blood on the occasion of my birthday or my daughter's birthday, else on demand. I am so happy that I have done a good job through net by registering on BharatBloodBank.com ..Khalid Ayub "

    } else if (param === "more2") {
        hideSection();
        tipHeading.innerHTML = "Blood Facts";
        tipContent.innerHTML = "Blood is the life-maintaining fluid that circulates through the body's heart, arteries, veins and capillaries.<br> <br>Blood carries to the body nourishment, electrolytes, hormones, vitamins, antibodies, heat, and oxygen. <br>Granulocytes, a type of white blood cell, roll along blood vessel walls to search and destroy bacteria <br><br> Blood platelets help clotting and give those with leukemia and other cancers a chance to live. <br><br>You will not be eligible to donate blood if you have consumed alcohol 48 hours before donation"

    } else if (param === "more3") {
        hideSection();
        tipHeading.innerHTML = "Tips on Blood Donation";
        tipContent.innerHTML = "Have a good meal at least 3 hours before donating blood.<br><br>Accept the snacks offered to you after the donation, it is vital that you have them. You are recommended to have a good meal late<br><br>Avoid smoking on the day before donating. You can smoke 3 hours after donation.<br><br>You will not be eligible to donate blood if you have consumed alcohol 48 hours before donation.<br><br>My blood is common. I don't think there will be demand for it - That is why the demand for your type is greater than for rare types"

    }
}