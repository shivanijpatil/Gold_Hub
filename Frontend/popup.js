let loginButton = document.getElementById('login-button');
let userLocal = JSON.parse(localStorage.getItem("users"));
let logout = document.getElementById("logout-link");
let emailAddr = JSON.parse(localStorage.getItem("emailAdd"));
let emailgetfromlocal = document.getElementById("emailgetfromlocal");
emailgetfromlocal.textContent = emailAddr;

// Open the popup
function openPopup() {
    document.getElementById("popup").style.display = "block";
}

// Close the popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

loginButton.addEventListener('click', function () {
    // If the email is not null, open the popup
    if (emailAddr != null) {
        openPopup();
    }
    else {

        window.location.href = "login.html";
    }
});

loginButton.textContent = emailAddr ? 'Account' : 'Login';

// Event listener for logout button
logout.addEventListener('click', function () {
    localStorage.removeItem("emailAdd");
    loginButton.textContent = 'Login';
    window.location.href = "login.html"
    closePopup();
});