function deleteTask(task, taskelement){
    const ok=confirm("Are you sure you want to delete this task?");
    
    if(!ok){
        return;
    }
    const position = tasks.findIndex(function(i){
        return i.id===task.id;
    })
    undotask=[];
    undoposition=[];
    undotask.push(task);
    undoposition.push(position);

     deletedtasks=[];
     deletedtasks.push(task);


    fetch(url+"/tasks/"+task.id,{
        method:"DELETE"
    })
    .then(function(res){
        if(!res.ok){
            throw new Error("Task was not deleted");
        }
        return res.json();
    })

    .then(function(){
        if(position!==-1){
            tasks.splice(position,1);
        }
        saveTask();
        filterTask();
        selectedtaskids.delete(task.id);
        const visibletaskid=[];
        for(let i=0;i<visibletaskids.length;i++){
            if(visibletaskids[i]!==task.id){
                visibletaskid.push(visibletaskids[i]);
            }
        }
        visibletaskids=visibletaskid;
        updatebar();
        showundo();
        if(editingtaskid===task.id){
            cancelEdit();
        }
    })
    .catch(function(error){
        console.log(error);
        alert("Task was not deleted");

    });

}