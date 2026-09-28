let editingtaskid = null;
let editingtaskelement = null;
let selectedtaskids = new Set();
let visibletaskids = [];
let undotask=[];
let undoposition=[];
let undotimer=null;
let tasks = [];
function saveTask(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
    localStorage.setItem("taskOrder",JSON.stringify(tasks.map(function(task){
        return task.id;
    })));
}
function createTask(event){
    event.preventDefault();
    const title=document.getElementById("title").value;
    const description=document.getElementById("description").value;
    const duedate=document.getElementById("dueDate").value;
    const priority=document.getElementById("priority").value;
    const category=document.getElementById("category").value;
    if(!title||title.trim()===""){
        alert("Title required");
        return;
    }
    const task={
        title:title.trim(),
        description:description,
        dueDate:duedate||null,
        priority:priority,
        category:category
    };
    if(editingtaskid!==null){
        updateTask(editingtaskid,task);
        return;
    }
    fetch(url+"/tasks",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(task)
    })
    .then(function(res){
        if(!res.ok){
            throw new Error("Task was not created");
        }
        return res.json();
    })
    .then(function(task){
        tasks.unshift(task);
        saveTask();
        categoryLoad();
        filterTask();
        document.getElementById("taskform").reset();
    })

    .catch(function(error){

        console.log(error);

        alert("Task was not created");

    });

}