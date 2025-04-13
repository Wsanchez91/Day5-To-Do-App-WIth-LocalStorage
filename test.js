const addBtn = document.querySelector("#add-task");

const saveTasks = ()=>{
    const tasks = [{
        task: "Walking the Dog",
        completed: false}];
    localStorage.setItem("myTasks", JSON.stringify(tasks));
};


const loadTasks = () => {
    const stored = JSON.parse(localStorage.getItem("myTasks"));
    stored.forEach((task) => {
      console.log(task);
    });
  };

addBtn.addEventListener('click', ()=>{
    saveTasks();
    loadTasks();
})