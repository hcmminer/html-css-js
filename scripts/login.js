"use strict";
// global var
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const submitBtn = document.getElementById("btn-submit");
// userArr
const userSEC = "userSEC";
const userArr = getDataFromStorage(userSEC) || [];
// current user
const currentUserSEC = "currentUserSEC";
let currentUser = getDataFromStorage(currentUserSEC) || {};
// validate
function validate(data) {
  const alertContainer = [];
  console.log(data.username.length);
  if (data.username.length === 0) {
    alertContainer.push("username is required");
  }
  let indexUN = userArr.findIndex((item) => item.username === data.username);
  // if not found username
  if (indexUN < 0) {
    alertContainer.push("username not found");
  }
  let indexPW = userArr.findIndex((item) => item.password === data.password);
  if (indexPW < 0) {
    alertContainer.push("password wrong !");
  }
  if (alertContainer.length > 0) {
    alert(alertContainer);
    return false;
  } else {
    return true;
  }
}
// parse data
function parseData(data) {
  return new User(data.firstname, data.lastname, data.username, data.password);
}

// handle event click login
submitBtn.addEventListener("click", function () {
  // get user data
  const data = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  // if validated
  if (validate(data)) {
    // find user
    currentUser = userArr.find((item) => item.username === data.username);
    // save data
    setDataTotorage(currentUserSEC, parseData(currentUser));
    window.location.href = "../index.html";
  }
});
