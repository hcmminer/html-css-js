"use strict";

const inputPagesize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnSubmit = document.getElementById("btn-submit");

// validate
function validate(data) {
  if (data.pagesize.length === 0) {
    alert("pagesize is required");
    return false;
  }
  if (data.category === "General") {
    alert("category is required");
    return false;
  }
}
// get current user from local storeage
let getCurrentUser = () => {
  return getDataFromStorage("currentUserSEC") || {};
};
let currentUser = getCurrentUser();
btnSubmit.addEventListener("click", function () {
  // get form data
  let data = {
    pagesize: Number(inputPagesize.value),
    category: inputCategory.value,
  };
  // validate
  if (validate(data) === false) {
    alert("all field is required");
  } else {
    currentUser = {
      ...currentUser,
      pagesize: Number(inputPagesize.value),
      category: inputCategory.value,
    };
    // replace in local
    localStorage.removeItem("currentUserSEC");
    setDataTotorage("currentUserSEC", currentUser);
  }
});
