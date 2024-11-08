// cache registration id
const registration = document.getElementById("registration");
console.log(registration);

// get registration's values using name attribute
const username = registration.elements["username"];
const email = registration.elements["email"];
const password = registration.elements["password"];
const passwordCheck = registration.elements["passwordCheck"];

registration.addEventListener("submit", (event) => {
  const userVal = validateUsername();
  if (userVal === false) {
    event.returnValue = false;
    return false;
  }

  const emailVal = validateEmail();
  if (emailVal === false) {
    event.returnValue = false;
    return false;
  }

  const passwordVal = validatePassword();
  if (passwordVal === false) {
    event.returnValue = false;
    return false;
  }
});

function validateUsername() {
  let userVal = username.value;
  // covers blank username + at least 4 chars long
  if (userVal.length <= 3) {
    alert("Your username must have at least 4 characters!");
    username.focus();
    return false;
  }
  return userVal;
}

function validateEmail() {
  let emailVal = email.value;
  const atpos = emailVal.indexOf("@");
  let temp = 0;
  for (let i = emailVal.indexOf("@") + 1; i < emailVal.length; i++) {
    // finds only the '.' after the @ symbol
    if (emailVal[i] === ".") {
      temp = i;
      break;
    }
  }
  const dotpos = temp;

  if (atpos < 1) {
    // checking that @ is not first character
    alert(
      "Invalid Email! Must include @ symbol, which must not be at the beginning."
    );
    email.focus();
    return false;
  }

  if (dotpos - atpos < 2) {
    // checking that after @, there is some domain name
    alert(
      "Invalid structure: @. \n You must include a domain name after the @ symbol."
    );
    email.focus();
    return false;
  }

  // checking specifically for example.com
  let domain = "";
  for (i = emailVal.indexOf("@") + 1; i < emailVal.length; i++) {
    domain += emailVal[i];
  }
  // confirm if .com (top-level domain)
  if (domain === "example.com") {
    alert("The domain example.com is a fake domain!");
    email.focus();
    return false;
  }
  return true;
}

function validatePassword() {
  let passwordVal = password.value;
  let userVal = username.value; // will be used to check for username in password
  let passwordCheckVal = passwordCheck.value; // will check to match password with confirmed password
  let hasNum = false;
  // iterate through password
  for (let i = 0; i < passwordVal.length; i++) {
    // see if at least one number is used
    if (
      passwordVal[i].charCodeAt(0) >= 48 &&
      passwordVal[i].charCodeAt(0) <= 57
    ) {
      // if number 0 through 9 is found, set to true
      hasNum = true;
    }
  }
  if (hasNum === false) {
    alert("Your password needs to contain at least 1 number!");
    password.focus();
    return false;
  } else if (passwordVal.toLoweCase().includes("password")) {
    // if the password contains the word "password"
    alert("A password containing the word 'password' is not valid!");
    password.focus();
    return false;
  } else if (passwordVal.toLoweCase().includes(userVal)) {
    // if the password contains the user's username
    alert("A password containing the your own username is not valid!");
    password.focus();
    return false;
  } else if (passwordVal !== passwordCheckVal) {
    // if the password is not typed in twice properly
    alert("Please re-enter your password to make sure it's correct!");
    passwordCheck.focus();
    return false;
  } else {
    return true;
  }
}

// cache login id
const login = document.getElementById("login");

// get login's values using name attribute
const login_username = login.elements["username"];
const login_password = login.elements["password"];
const login_persist = login.elements["persist"];

console.log(login_persist);

login.addEventListener("submit", (event) => {
  const userVal = validateLoginUsername();
  if (userVal === false) {
    event.returnValue = false;
    return false;
  }

  const passwordVal = validateLoginPassword();
  if (passwordVal === false) {
    event.returnValue = false;
    return false;
  }

  if (login_persist.checked) {
    alert("Successful login! User will remain logged in.");
  } else {
    alert("Successful login!");
  }
});

function validateLoginUsername() {
  let userVal = login_username.value;
  // covers blank username + at least 4 chars long
  if (userVal.length <= 3) {
    alert("Your username must have at least 4 characters!");
    login_username.focus();
    return false;
  }
  return userVal;
}

function validateLoginPassword() {
  let passwordVal = login_password.value;
  if (passwordVal.length < 1) {
    alert("Your password cannot be blank!");
    login_password.focus();
    return false;
  }
  return true;
}
