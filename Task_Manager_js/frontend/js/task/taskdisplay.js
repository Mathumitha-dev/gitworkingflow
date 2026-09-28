function showtask(task){
    const tasklist=document.getElementById("tasklist");
    const taskelement=document.createElement("div");
    taskelement.className="task";
    taskelement.setAttribute("data-id",task.id);
    visibletaskids.push(task.id);
    const statuscheckbox=document.createElement("input");
    statuscheckbox.type="checkbox";
    statuscheckbox.checked=task.status==="Completed";
    const taskname=document.createElement("span");
    taskname.textContent=task.title;
    if(task.status==="Completed"){
        taskname.style.textDecoration="line-through";
    }
    statuscheckbox.onchange=function(){
        toggleStatus(task,taskname,statuscheckbox);
    };
    const taskselectcheckbox=document.createElement("input");
    taskselectcheckbox.type="checkbox";
    taskselectcheckbox.className="taskSelectCheckbox";
    taskselectcheckbox.onchange=function(){
        if(taskselectcheckbox.checked){
            selectedtaskids.add(task.id);
        }
        else{
            selectedtaskids.delete(task.id);
        }
        updatebar();
    };
    taskselectcheckbox.checked=selectedtaskids.has(task.id);
    const description=document.createElement("p");
    description.textContent=task.description||"";
    const date=document.createElement("p");
    if(task.due_date){
        date.textContent="Due date: "+task.due_date.substring(0,10);
    }
    else{
        date.textContent="Due date: ";
    }
    const priority=document.createElement("p");
    priority.textContent="Priority: "+(task.priority||"Medium");
    const category=document.createElement("span");
    category.className="category-chip";
    category.textContent=task.category||"";
    if(task.category){
        category.style.backgroundColor=getCategoryColor(task.category);
        category.hidden=false;
    }
    else{
        category.hidden=true;
    }
    const editbutton=document.createElement("button");
    editbutton.type="button";
    editbutton.textContent="Edit";
    editbutton.onclick=function(){
        editTask(task,taskelement);
    };
    const deletebutton=document.createElement("button");
    deletebutton.type="button";
    deletebutton.textContent="Delete";

    deletebutton.onclick=function(){

        deleteTask(task,taskelement);

    };

    taskelement.appendChild(statuscheckbox);
    taskelement.appendChild(taskselectcheckbox);
    taskelement.appendChild(taskname);
    taskelement.appendChild(description);
    taskelement.appendChild(date);
    taskelement.appendChild(priority);
    taskelement.appendChild(category);
    taskelement.appendChild(editbutton);
    taskelement.appendChild(deletebutton);
    tasklist.appendChild(taskelement);
    enableDrag(taskelement);

}