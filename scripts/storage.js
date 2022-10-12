"use strict";
function getDataFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
function setDataTotorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
