const taskInput=document.getElementById("taskInput");
const addTaskBtn=document.getElementById("addTaskBtn");
const taskList=document.getElementById("taskList");
const filterButtons=document.querySelectorAll(".filter-btn");

let currentFilter="all";
let tasks=JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(){
    taskList.innerHTML="";
    tasks.filter(task=>{
        if(currentFilter==="active") return !task.completed;
        if(currentFilter==="completed") return task.completed;
        return true;
    }).forEach((task,index)=>{
        const li=document.createElement("li");
        li.className=task.completed ? "completed" : "";

        const span=document.createElement("span");
        span.textContent=task.text;
        span.onclick=()=>toggleTask(index);

        const deleteBtn=document.createElement("button");
        deleteBtn.textContent="🗑️";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick=()=>deleteTask(index);

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    filterButtons.forEach(button=>{
        button.addEventListener("click",()=>{
            filterButtons.forEach(btn=>btn.classList.remove("active"));
            button.classList.add("active");
            currentFilter=button.dataset.filter;
            renderTasks();
        });
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click",()=>{
    const text=taskInput.value.trim();
    if(text==="") return;
    tasks.push({text,completed:false});
    taskInput.value="";
    renderTasks();
});

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTaskBtn.click();
    }
});

function toggleTask(index){
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

renderTasks();