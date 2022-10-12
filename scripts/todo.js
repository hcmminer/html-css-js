"use strict";
const btnAdd = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");
const inputTask = document.getElementById("input-task");
// calss Task
class Task {
  constructor(task, owner, isDone, id) {
    this.id = id;
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

// todoArr
const todoKey = "todoKey";
const todoArr = getDataFromStorage(todoKey) || [];
// define current user
const currentUser = getDataFromStorage("currentUserSEC") || {};
// filter todoArr whith current user
const todoCurrentArr = () =>
  todoArr.filter((item) => item.owner === currentUser.username);
// render todolist from current user
function renderTodo(todolists) {
  // clear list
  todoList.innerHTML = "";
  for (let index = 0; index < todolists.length; index++) {
    const element = todolists[index];
    const row = document.createElement("li");
    // loi dung username la uniquie nen gan them index de key cung la uniquie (chua can dung gan Id trong Task)
    row.innerHTML = `<li key=${element.id} onclick="toogleTask(this)" class="">${element.task}<span onclick="deleteTask(this)" class="close">×</span></li>`;
    todoList.appendChild(row);
  }
}
// init render data
renderTodo(todoCurrentArr());
// get max id of element in todoArr
let idMax = () =>
  todoArr.reduce(
    (accumulator, element) =>
      accumulator.id > element.id ? accumulator.id : element.id,
    0
  );
// vong lap event
//NOTE: ban chat click giong nhu vong lap for , chi vong tron trong {}, nen khi referen toi bien thi cac bien lay o ben tren no chua duoc update
btnAdd.addEventListener("click", function () {
  let id = idMax() + 1;
  // set id uniquie
  // get new task from input
  const todoData = new Task(inputTask.value, currentUser.username, false, id);
  // validate and push and save
  if (todoData.task.length === 0) {
    alert("task name is required");
  } else {
    // clear input
    inputTask.value = null;
    // push array
    todoArr.push(todoData);
    // save
    setDataTotorage("todoKey", todoArr);
    // render data
    renderTodo(todoCurrentArr());
  }
});
// vong lap event
// toogle task and save state localStorage
function toogleTask(e) {
  // toogle class
  e.classList.toggle("checked");
  // get key attribute in element
  let key = Number(e.getAttribute("key"));
  // find Index in array
  let index = todoArr.findIndex((item) => item.id === key);
  // edit isDone
  if (index >= 0) {
    todoArr[index].isDone = !todoArr[index].isDone;
  }
  // save to local
  setDataTotorage("todoKey", todoArr);
}
// vong lap event
// delete task
function deleteTask(e) {
  let key = Number(e.parentElement.getAttribute("key"));
  // find Index in array
  let index = todoArr.findIndex((item) => item.id === key);
  // edit isDone
  if (index >= 0) {
    todoArr.splice(index, 1);
  }
  // save to local
  setDataTotorage("todoKey", todoArr);
  // rerender
  renderTodo(todoCurrentArr());
}
