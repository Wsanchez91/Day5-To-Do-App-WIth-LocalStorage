const addBtn = document.querySelector("#add-task");
const input = document.querySelector("#todo-input");
const taskList = document.querySelector("#task-list");
const filterAllBtn = document.querySelector("#filter-all");
const filterActiveBtn = document.querySelector("#filter-active");
const filterCompletedBtn = document.querySelector("#filter-completed");

addBtn.addEventListener("click", () => {
  const taskText = input.value.trim();
  if (taskText) {
    addNewTask(taskText, false);
    loadTasks();
    updateStorage();
    input.value = "";
  }
});

const loadTasks = () => {
  const stored = JSON.parse(localStorage.getItem("myTasks")) || [];
  stored.forEach((text) => {
    addNewTask(text.task);
  });
};

const updateStorage = () => {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    tasks.push({
      task: li.querySelector("span").textContent.trim(),
      complete: li.classList.contains("completed"),
    });
    console.log("Saved to localStorage", tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
};

const addNewTask = (text, status) => {
  const li = document.createElement("li");
  const completeBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const textSpan = document.createElement("span");
  const stored = JSON.parse(localStorage.getItem("tasks")) || [];
  const addTask = [
    {
      task: text,
      completed: status,
    },
  ];

  // li.style.display = "flex";
  // li.style.justifyContent = "space-between";
  // li.style.alignItems = "center";

  textSpan.textContent = text;
  completeBtn.textContent = "✔";
  deleteBtn.textContent = "🗑";
  li.appendChild(textSpan);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  stored.push(addTask);
  localStorage.setItem("tasks", JSON.stringify(stored));

  input.value = "";
};

window.addEventListener("DOMContentLoaded", loadTasks);

