let editingTaskId=null;
let editingTaskElement=null;
function createTask(){
    const title=document.getElementById("title");
    const description=document.getElementById("description");
    const dueDate=document.getElementById("dueDate");
    const priority=document.getElementById("priority");
    const category=document.getElementById("category");
    const titleError=document.getElementById("titleError");
    const dueDateError=document.getElementById("dueDateError");
    titleError.textContent="";
    dueDateError.textContent="";
    if(title.value.trim()===""){
        titleError.textContent="Title is required";
        return;
    }
    if(dueDate.value===""){
        dueDateError.textContent="Due date is required";
        return;
    }
    const task={
        title:title.value.trim(),
        description:description.value.trim(),
        dueDate:dueDate.value,
        priority:priority.value,
        category:category.value.trim()
    };
    if(editingTaskId!==null){
        updateTask(editingTaskId,task);
        return;
    }
    fetch(URL+"/tasks",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(task)
    })
    .then(function(res){
        return res.json();
    })
    .then(function(newTask){

        showtask(newTask);

        document.getElementById("taskform").reset();

        titleError.textContent="";
        dueDateError.textContent="";
    });
}
function showtask(task){
    const tasklist=document.getElementById("tasklist");
    const element=document.createElement("div");
    tasklist.appendChild(element);

    element.innerHTML=`
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Due Date: ${task.due_date}</p>
        <p>Priority: ${task.priority}</p>
        <p>Category: ${task.category}</p>
    `;
    const editButton=document.createElement("button");
    editButton.textContent="Edit";
    editButton.onclick=function(){
        editTask(task,element);
    };
    element.appendChild(editButton);
    const deleteButton=document.createElement("button");
    deleteButton.textContent="Delete";
    deleteButton.onclick=function(){
        deleteTask(task,element);
    };
    element.appendChild(deleteButton);
}
function editTask(task,element){
    editingTaskId=task.id;
    editingTaskElement=element;
    document.getElementById("title").value=task.title;
    document.getElementById("description").value=task.description;
    const dueDateInput=document.getElementById("dueDate");
    const dueDate=task.due_date;
    if(dueDate){
        const correctDate=dueDate.substring(0,10);
        dueDateInput.value=correctDate;
    }
    document.getElementById("priority").value=task.priority;
    document.getElementById("category").value=task.category;
    document.getElementById("saveButton").textContent="Save";
    const oldCancelButton=document.getElementById("cancelButton");
    if(oldCancelButton){
        oldCancelButton.remove();
    }
    const cancelButton=document.createElement("button");
    cancelButton.id="cancelButton";
    cancelButton.type="button";
    cancelButton.textContent="Cancel";
    cancelButton.onclick=function(){
        cancelEdit();
    };
    document.getElementById("taskform").appendChild(cancelButton);
}
function updateTask(id,task){
    fetch(URL+"/tasks/"+id,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(task)
    })
    .then(function(res){
        return res.json();
    })
    .then(function(updatedTask){

        editingTaskElement.innerHTML=`
            <h3>${updatedTask.title}</h3>
            <p>${updatedTask.description}</p>
            <p>Due Date: ${updatedTask.due_date}</p>
            <p>Priority: ${updatedTask.priority}</p>
            <p>Category: ${updatedTask.category}</p>
        `;
        const editButton=document.createElement("button");
        editButton.textContent="Edit";
        editButton.onclick=function(){
            editTask(updatedTask,editingTaskElement);
        };
        editingTaskElement.appendChild(editButton);
        const deleteButton=document.createElement("button");
        deleteButton.textContent="Delete";
        deleteButton.onclick=function(){
            deleteTask(updatedTask,editingTaskElement);
        };
        editingTaskElement.appendChild(deleteButton);
        document.getElementById("taskform").reset();
        editingTaskId=null;
        editingTaskElement=null;
        document.getElementById("saveButton").textContent="Add";
        const cancelButton=document.getElementById("cancelButton");
        if(cancelButton){
            cancelButton.remove();
        }
    });
}

function cancelEdit(){
    document.getElementById("taskform").reset();
    editingTaskId=null;
    editingTaskElement=null;
    document.getElementById("saveButton").textContent="Add";
    const cancelButton=document.getElementById("cancelButton");
    if(cancelButton){
        cancelButton.remove();
    }
    document.getElementById("titleError").textContent="";
    document.getElementById("dueDateError").textContent="";
}


function deleteTask(task,element){
    fetch(URL+"/tasks/"+task.id,{
        method:"DELETE"
    })
    .then(function(res){
        return res.json();
    })
    .then(function(){

        element.remove();
    });
}