const addBtn = document.querySelector("#add-task");
const input = document.querySelector("#todo-input");
const taskList = document.querySelector("#task-list");
const filterAllBtn = document.querySelector("#filter-all");
const filterActiveBtn = document.querySelector("#filter-active");
const filterCompletedBtn = document.querySelector("#filter-completed");
const completeBtn = document.createElement("button");
const deleteBtn = document.createElement("button");
const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

const updateStorage = () => {
  taskList.innerHTML = "";
  completeBtn.textContent = "✔";
  deleteBtn.textContent = "🗑";

  taskData.forEach(({data}) => {
    taskList.innerHTML += `
    <li>${data}<span>${completeBtn}${deleteBtn}</li>
    `;
  });
  localStorage.setItem("data", JSON.stringify(data));
};

addBtn.addEventListener("click", (e)=>{
  e.preventDefault();

  updateStorage()
})