function editTask(task,taskelement){
    editingtaskid=task.id;
    editingtaskelement=taskelement;
    document.getElementById("title").value=task.title;
    document.getElementById("description").value=task.description||"";
    const duedateinput=document.getElementById("dueDate");
    if(task.due_date){
        const date=task.due_date.substring(0,10);
        duedateinput.value=date;
    }
    else{
    duedateinput.value="";
    }
    document.getElementById("priority").value=task.priority||"Medium";
    document.getElementById("category").value=task.category||"";
    document.getElementById("saveButton").textContent="save";
    document.getElementById("cancelButton").style.display="inline";
}
function updateTask(id,task){
    fetch(url+"/tasks/"+id,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(task)
    })
    .then(function(res){
        return res.json();
    })
    .then(function(updatedtask){
    for(let i=0;i<tasks.length;i++){
            if(tasks[i].id==id){
                tasks[i]=updatedtask;
            }
        }
        saveTask();
        categoryLoad();
        editingtaskelement.remove();
        const visibletaskid=[];
        for(let i=0;i<visibletaskids.length;i++){
            if(visibletaskids[i]!==id){
                visibletaskid.push(visibletaskids[i]);
            }
        }
    visibletaskids=visibletaskid;
    showtask(updatedtask);
    document.getElementById("taskform").reset();
    document.getElementById("saveButton").textContent="add";
    document.getElementById("cancelButton").style.display="none";
    editingtaskid=null;
    editingtaskelement=null;
    })
 .catch(error=>{
        console.log(error);
        alert("Task was not updated");
   });
}
function cancelEdit(){
    document.getElementById("taskform").reset();
    document.getElementById("saveButton").textContent="Save";
    document.getElementById("cancelButton").style.display="none";
    editingtaskid=null;
    editingtaskelement=null;
}