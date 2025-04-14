const input = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-task");
const taskList = document.querySelector("#task-list");
const filterAllBtn = document.querySelector("#filter-all");
const filterActiveBtn = document.querySelector("#filter-active");
const filterCompletedBtn = document.querySelector("#filter-completed");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const task = input.value.trim();
  if (task !== "") {
    addTask(task, false);
    updateStorage();
    input.value = "";
  }
});

function addTask(text, completed) {
  const li = document.createElement("li");
  const completeBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const textSpan = document.createElement("span");
  textSpan.textContent = text;

  completeBtn.textContent = "✔";
  deleteBtn.textContent = "🗑";

  if (completed) {
    li.classList.add("completed");
  }

  li.appendChild(textSpan);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateStorage();
  });
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateStorage();
  });
}

const getTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];



const loadTasks = () => {
  const tasks = getTasks();
  tasks.forEach(({ text, completed }) => addTask(text, completed));
};

const updateStorage = () => {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent.trim(),
      completed: li.classList.contains("completed"),
    });
  });
  console.log("Saving to localStorage:", tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

filterAllBtn.addEventListener("click", () => {
  taskList.querySelectorAll("li").forEach((li) => {
    li.style.display = "flex";
  });
});

filterActiveBtn.addEventListener("click", () => {
  taskList.querySelectorAll("li").forEach((li) => {
    li.style.display = li.classList.contains("completed") ? "none" : "flex";
  });
});

filterCompletedBtn.addEventListener("click", () => {
  taskList.querySelectorAll("li").forEach((li) => {
    li.style.display = li.classList.contains("completed") ? "flex" : "none";
  });
});

window.addEventListener("DOMContentLoaded", loadTasks);
