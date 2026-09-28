function showundo(){
    const box=document.getElementById("undobox");
    box.style.display="block";
    if(undotimer){
        clearTimeout(undotimer);
    }
    undotimer=setTimeout(function(){
        box.style.display="none";
        undotask=[];
        undoposition=[];
    },5000);
}
function undoDelete(){
    if(undotask.length===0){
        return;
    }
    const tasksToRestore=undotask;
    const positionsToRestore=undoposition;
    undotask=[];
    undoposition=[];
    clearTimeout(undotimer);
    restoreTask(0,tasksToRestore,positionsToRestore);
}
function restoreTask(index,tasksToRestore,positionsToRestore){
    if(index>=tasksToRestore.length){
        saveTask();
        categoryLoad();
        filterTask();
        const undobox=document.getElementById("undobox");
        undobox.style.display="none";
        return;
    }
    const task=tasksToRestore[index];
    const position=positionsToRestore[index];
    fetch(url+"/tasks",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            title:task.title,
            description:task.description||"",
            dueDate:task.due_date?task.due_date.substring(0,10):null,
            priority:task.priority||"Medium",
            category:task.category||""
        })
    })
    .then(function(res){
        if(!res.ok){
            throw new Error("Task was not restored");
        }
        return res.json();
    })
    .then(function(newtask){
        if(task.status==="Completed"){
            return fetch(url+"/tasks/"+newtask.id+"/status",{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({status:"Completed"})
            }).then(function(res){
                if(!res.ok){
                    throw new Error("Task status was not restored");
                }
                return res.json();
            });
        }
        return newtask;
    })
    .then(function(newtask){
        tasks.splice(Math.max(0,position),0,newtask);
        restoreTask(index+1,tasksToRestore,positionsToRestore);
    })
    .catch(function(error){
        console.log(error);
        alert("Task was not restored");
    });
}