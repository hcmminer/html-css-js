"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

// check user is login ?
const currentUser = getDataFromStorage("currentUserSEC") || {};
// neu currentUser = {} thi xuat hien loi username of undifined : THEM ?
if (currentUser.username?.length > 0) {
  // if login
  loginModal.style.display = "none";
  welcomeMessage.innerHTML = `Welcome ${currentUser.firstname}`;
} else {
  // if no login
  mainContent.style.display = "none";
}

// log out
btnLogout.addEventListener("click", function () {
  localStorage.removeItem("currentUserSEC");
  window.location.href = "./pages/login.html";
});
