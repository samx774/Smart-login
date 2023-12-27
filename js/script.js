var createNameInput = document.getElementById('createNameInput');
var createEmailInput = document.getElementById('createEmailInput');
var createPasswordInput = document.getElementById('createPasswordInput');
var loginEmailInput = document.getElementById('loginEmailInput');
var loginPasswordInput = document.getElementById('loginPasswordInput');
var welcomeUser = document.getElementById('welcomeUser');
var signup = document.getElementById('signup');
var loginBtn = document.getElementById('loginBtn');
var usersAccounts;

if (localStorage.getItem('accounts')) {
    usersAccounts = JSON.parse(localStorage.getItem('accounts'));
} else {
    usersAccounts = [];
}

// localStorage.removeItem('accounts');

function emailExist() {
    for (var i = 0; i < usersAccounts.length; i++) {
        if (createEmailInput.value == usersAccounts[i].userEmail) {
            return false
        }
    }
}

function createAccount() {
    if (createNameInput.value == '' || createEmailInput.value == '' || createPasswordInput.value == '') {
        signup.nextElementSibling.classList.add('d-none');
        document.getElementById('emailValid').classList.add('d-none');
        document.getElementById('emailExists').classList.add('d-none');
        document.getElementById('emptySignup').classList.remove('d-none');
    }
    else if (emailExist() == false) {
        signup.nextElementSibling.classList.add('d-none');
        document.getElementById('emptySignup').classList.add('d-none');
        document.getElementById('emailValid').classList.add('d-none');
        document.getElementById('emailExists').classList.remove('d-none');
    }
    else if (validEmail(createEmailInput.value) == false) {
        signup.nextElementSibling.classList.add('d-none');
        document.getElementById('emailExists').classList.add('d-none');
        document.getElementById('emptySignup').classList.add('d-none');
        document.getElementById('emailValid').classList.remove('d-none');
    }
    else {
        var account = {
            userName: createNameInput.value,
            userEmail: createEmailInput.value,
            userPassword: createPasswordInput.value,
        }
        usersAccounts.push(account);
        localStorage.setItem('accounts', JSON.stringify(usersAccounts));
        clearInputs()
        document.getElementById('emailValid').classList.add('d-none');
        document.getElementById('emailExists').classList.add('d-none');
        document.getElementById('emptySignup').classList.add('d-none');
        signup.nextElementSibling.classList.remove('d-none');
    }
}
function clearInputs() {
    createNameInput.value = '';
    createEmailInput.value = '';
    createPasswordInput.value = '';
}

function userLogin() {
    for (var i = 0; i < usersAccounts.length; i++) {
        if (loginEmailInput.value == usersAccounts[i].userEmail && loginPasswordInput.value == usersAccounts[i].userPassword) {
            localStorage.setItem('usersName', JSON.stringify(usersAccounts[i].userName))
            // window.location.assign('../home.html')
            document.getElementById('link').setAttribute('href', 'home.html')
        } else if (loginEmailInput.value == '' && loginPasswordInput.value == '') {
            document.getElementById('incorrect').classList.add('d-none');
            document.getElementById('empty').classList.remove('d-none');
        } else {
            document.getElementById('empty').classList.add('d-none');
            document.getElementById('incorrect').classList.remove('d-none');
        }
    }
}
function validEmail(email) {
    var regex = /^[a-z-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regex.test(email)) {
        return true
    } else {
        return false
    }
}

welcomeUser.innerHTML = 'Welcome ' + JSON.parse(localStorage.getItem('usersName'));
signup.addEventListener('click', emailExist);