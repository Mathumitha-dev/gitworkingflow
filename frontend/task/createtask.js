let edId=null;
let edEt=null;
function createTask(){
    const title=document.getElementById("title");
    const description=document.getElementById("description");
    const duedate=document.getElementById("dueDate");
    const priority=document.getElementById("priority");
    const category=document.getElementById("category");
    const error=document.getElementById("titleError");
    if(title.value.trim()===""){
        error.textContent="Title is required";
        return;
    }
    const task={
        title:title.value.trim(),
        description:description.value.trim(),
        dueDate:duedate.value,
        priority:priority.value,
        category:category.value.trim()
    }
    if(edId!==null){
        updateTask(edId,task);
          return;
    }
    fetch("http://localhost:3000/tasks",{
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
    })
}
function showtask(task){
    const tasklist=document.getElementById("tasklist");
    const element=document.createElement("div");
    tasklist.appendChild(element);
    element.innerHTML=`
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p>Due Date:${task.due_date}</p>
    <p>Priority:${task.priority}</p>
    <p>Category:${task.category}</p>
    `
    const eb=document.createElement("button");
    eb.textContent="Edit";
    eb.onclick=function(){
        editTask(task,element);
    }
    element.appendChild(eb);
    const db=document.createElement("button");
    db.textContent="delete";
    db.onclick=function(){
        deleteTAst(tas.id,element);
    }
    element.appendChild(db);
}
function editTask(task,element){
    edId=task.id;
    edEt=element;
    document.getElementById("title").value=task.title;
    document.getElementById("description").value=task.description;
    const ele=document.getElementById("dueDate");
    const dueDate=task.due_date;
    if(dueDate){
        const datecorrect=dueDate.substring(0,10);
        ele.value=datecorrect;
    }
    document.getElementById("priority").value=task.priority;
    document.getElementById("category").value=task.category;
    document.getElementById("saveButton").textContent="Save";
    const cb=document.createElement("button");
    cb.id="cancelButton";
    cb.type="button";
    cb.textContent="cancel";
    cb.onclick=function(){
        cancelEdit();
    }
    document.getElementById("taskform").appendChild(cb);
}
function updateTask(id,task){
    fetch("http://localhost:3000/tasks/"+id,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(task)
    }).then(function(res){
        return res.json();
    }).then(function(updatedtask){
        edEt.innerHTML=`
            <h3>${updatedtask.title}</h3>
            <p>${updatedtask.description}</p>
            <p>Due Date:${updatedtask.due_date}</p>
            <p>Priority:${updatedtask.priority}</p>
            <p>Category:${updatedtask.category}</p>
        `;
        const eb=document.createElement("button");
        eb.textContent="Edit";
        eb.onclick=function(){
            editTask(updatedtask,edEt);
        }
        edEt.appendChild(eb);
        document.getElementById("taskform").reset();
        edId=null;
        edEt=null;
        document.getElementById("saveButton").textContent="Add";
        const cb=document.getElementById("cancelButton");
        if(cb){
            cb.remove();
        }
    })
}
function cancelEdit(){
    document.getElementById("taskform").reset();
    edId=null;
    edEt=null;
    document.getElementById("saveButton").textContent="Add";
    const cb=document.getElementById("cancelButton");
    if(cb){
        cb.remove();
    }
}

