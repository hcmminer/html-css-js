"use strict";
const RegisterBtn = document.getElementById("btn-submit");
const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const passwordInputCofirm = document.getElementById("input-password-confirm");
const userSEC = "userSEC"; // save to local storage whith key
const userArr = getDataFromStorage(userSEC) || [];
// validate
function validate(data) {
  const alertContainer = [];
  if (data.firstname.length === 0) {
    alertContainer.push("First name required");
  }
  if (data.lastname.length === 0) {
    alertContainer.push("Last name required");
  }
  if (
    userArr.findIndex((item) => item.username === data.username) >= 0 ||
    data.username.length === 0
  ) {
    alertContainer.push("User name required and uniquie");
  }
  if (data.password.length === 0 || data.password.length <= 8) {
    alertContainer.push("Password required and at least 9 character");
  }
  if (data.password !== data.passwordCofirm) {
    alertContainer.push("Password and confirm password must be same");
  }
  if (alertContainer.length === 0) {
    return true;
  } else {
    // when user wrong type input, alert notifications
    let alertBox = "";
    for (let index = 0; index < alertContainer.length; index++) {
      alertBox += `${alertContainer[index]}\n`;
    }
    alert(alertBox);
    return false;
  }
}
// convert Oject to intance of class to save localStorage
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );
  return user;
}
// clear form
function clearForm() {
  firstNameInput.value = null;
  lastNameInput.value = null;
  usernameInput.value = null;
  passwordInput.value = null;
  passwordInputCofirm.value = null;
}

// Handle click Register Event
RegisterBtn.addEventListener("click", function () {
  // get form data
  const userData = {
    firstname: firstNameInput.value,
    lastname: lastNameInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
    passwordCofirm: passwordInputCofirm.value,
  };
  if (validate(userData)) {
    // parse to intance of Object
    userArr.push(parseUser(userData));
    setDataTotorage(userSEC, userArr);
    clearForm();
    // redirect
    window.location.href = "../pages/login.html";
  }
});
