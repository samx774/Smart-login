// Get references to various HTML elements
var createNameInput = document.getElementById('createNameInput');
var createEmailInput = document.getElementById('createEmailInput');
var createPasswordInput = document.getElementById('createPasswordInput');
var loginEmailInput = document.getElementById('loginEmailInput');
var loginPasswordInput = document.getElementById('loginPasswordInput');
var welcomeUser = document.getElementById('welcomeUser');
var signup = document.getElementById('signup');
var loginBtn = document.getElementById('loginBtn');
var usersAccounts;

// Check if there are existing accounts in local storage, and retrieve them if available
if (localStorage.getItem('accounts')) {
    usersAccounts = JSON.parse(localStorage.getItem('accounts'));
} else {
    // Initialize an empty array if no accounts are found
    usersAccounts = [];
}

// Uncomment the line below to clear the stored accounts in local storage
// localStorage.removeItem('accounts');

// Function to check if the entered email already exists in the user accounts
function emailExist() {
    for (var i = 0; i < usersAccounts.length; i++) {
        if (createEmailInput.value == usersAccounts[i].userEmail) {
            return false;
        }
    }
    return true;
}

// Function to create a new user account
function createAccount() {
    if (createNameInput.value == '' || createEmailInput.value == '' || createPasswordInput.value == '') {
        // Display an error message for empty input fields
        signup.nextElementSibling.classList.add('d-none');
        document.getElementById('emailValid').classList.add('d-none');
        document.getElementById('emailExists').classList.add('d-none');
        document.getElementById('emptySignup').classList.remove('d-none');
    } else if (emailExist() == false) {
        // Display an error message for an existing email
        signup.nextElementSibling.classList.add('d-none');
        document.getElementById('emptySignup').classList.add('d-none');
        document.getElementById('emailValid').classList.add('d-none');
        document.getElementById('emailExists').classList.remove('d-none');
    } else if (validEmail(createEmailInput.value) == false) {
        // Display an error message for an invalid email format
        signup.nextElementSibling.classList.add('d-none');
        document.getElementById('emailExists').classList.add('d-none');
        document.getElementById('emptySignup').classList.add('d-none');
        document.getElementById('emailValid').classList.remove('d-none');
    } else {
        // Create a new account, store it in local storage, and clear input fields
        var account = {
            userName: createNameInput.value,
            userEmail: createEmailInput.value,
            userPassword: createPasswordInput.value,
        };
        usersAccounts.push(account);
        localStorage.setItem('accounts', JSON.stringify(usersAccounts));
        clearInputs();
        document.getElementById('emailValid').classList.add('d-none');
        document.getElementById('emailExists').classList.add('d-none');
        document.getElementById('emptySignup').classList.add('d-none');
        signup.nextElementSibling.classList.remove('d-none');
    }
}

// Function to clear input fields
function clearInputs() {
    createNameInput.value = '';
    createEmailInput.value = '';
    createPasswordInput.value = '';
}

// Function to handle user login
function userLogin() {
    for (var i = 0; i < usersAccounts.length; i++) {
        if (loginEmailInput.value == usersAccounts[i].userEmail && loginPasswordInput.value == usersAccounts[i].userPassword) {
            // Store the user's name in local storage and redirect to home.html
            localStorage.setItem('usersName', JSON.stringify(usersAccounts[i].userName));
            document.getElementById('link').setAttribute('href', 'home.html');
            return
        } 


         if (loginEmailInput.value == '' || loginPasswordInput.value == '') {
            // Display an error message for empty login credentials
            document.getElementById('incorrect').classList.add('d-none');
            document.getElementById('empty').classList.remove('d-none');
        } else{
            // Display an error message for incorrect login credentials
            document.getElementById('empty').classList.add('d-none');
            document.getElementById('incorrect').classList.remove('d-none');
        }
    }
}

// Function to validate email format
function validEmail(email) {
    var regex = /^[a-z-0-9\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}

if(welcomeUser != null){    
    // Display the welcome message with the user's name
    welcomeUser.innerHTML = 'Welcome ' + JSON.parse(localStorage.getItem('usersName'));
}
if(signup != null){
    // Attach the emailExist function to the signup button click event
    signup.addEventListener('click', emailExist);
}
