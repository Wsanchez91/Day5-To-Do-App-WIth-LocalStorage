const addBtn = document.querySelector("#add-task");
const input = document.querySelector("#todo-input");

const loadTasks = () => {
  const stored = JSON.parse(localStorage.getItem("myTasks"));
  stored.forEach((task) => {
    console.log(task);
  });
};

addBtn.addEventListener("click", () => {
  const taskText = input.value.trim();
  if(taskText){
  addNewTask(taskText, false);
  loadTasks();
  input.value = "";
}});

const addNewTask = (text, status) => {
  const stored = JSON.parse(localStorage.getItem("myTasks")) || [];
  const addTask = {
    task: text,
    completed: status,
  };
  stored.push(addTask);
  localStorage.setItem("myTasks", JSON.stringify(stored));
};
