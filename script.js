const input = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-task");
const taskList = document.querySelector("#task-list");
const filterAllBtn = document.querySelector("#filter-all");
const filterActiveBtn = document.querySelector("#filter-active");
const filterCompletedBtn = document.querySelector("#filter-completed");

function addTask(text, completed) {
  const li = document.createElement("li");
  const completeBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  li.textContent = text;
  completeBtn.textContent = "✔";
  deleteBtn.textContent = "🗑";

  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  if (completed) {
    li.classList.add("completed");
  }

  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateStorage();
  });
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateStorage();
  });

  addBtn.addEventListener("click", () => {
    const task = input.value.trim();
    if (task !== "") {
      addTask(task, false);
      saveTask(task, false);
      input.value = "";
    }
  });
}

const saveTask = (text, completed) => {
  const tasks = getTasks();
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];

window.addEventListener("DOMContentLoaded", loadTasks);

const loadTasks = () => {
  const tasks = getTasks();
  tasks.forEach(({ text, completed }) => addTask(text, completed));
};

const updateStorage = () => {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      completed: li.classList.contains("completed"),
    });
  });
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
