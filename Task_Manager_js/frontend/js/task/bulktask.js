function bulkMarkComplete(){
    const ids=Array.from(selectedtaskids);
    if(ids.length===0){
        return;
    }
    fetch(url+"/tasks/bulk/status",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            ids:ids,
            status:"Completed"
        })
    })
    .then(function(res){
        if(!res.ok){
            throw new Error("Bulk complete failed");
        }
        return res.json();
    })
    .then(function(){
        selectedtaskids.clear();
        loadTasks();
    })
    .catch(function(error){
        console.log(error);
        alert("Bulk complete failed");
    });
}
function bulkMarkIncomplete(){
    const ids=Array.from(selectedtaskids);
    if(ids.length===0){
        return;
    }
    fetch(url+"/tasks/bulk/status",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            ids:ids,
            status:"Pending"
        })
    })
    .then(function(res){
        if(!res.ok){
            throw new Error("Bulk incomplete failed");
        }
        return res.json();
    })
    .then(function(){
        selectedtaskids.clear();
        loadTasks();
    })
    .catch(function(error){
        console.log(error);
        alert("Bulk incomplete failed");
    });
}
function bulkDelete(){
    const ids=Array.from(selectedtaskids);
    if(ids.length===0){
        return;
    }
    const ok=confirm("Are you sure you want to delete selected tasks?");
    if(!ok){
        return;
    }
    undotask=[];
    undoposition=[];
    for(let i=0;i<tasks.length;i++){
        if(selectedtaskids.has(tasks[i].id)){
            undotask.push(tasks[i]);
            undoposition.push(i);
        }
    }
    // const bos=document.getElementById("undobox");
    // bos.style.display="block";
    
    fetch(url+"/tasks/bulk/delete",{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            ids:ids
        })
    })
    .then(function(res){
        if(!res.ok){
            throw new Error("Bulk delete failed");
        }
        return res.json();
    })
    .then(function(){
        const newtasks=[];

        for(let i=0;i<tasks.length;i++){

            if(!selectedtaskids.has(tasks[i].id)){

                newtasks.push(tasks[i]);
            }
        }

        tasks=newtasks;
        selectedtaskids.clear();
        saveTask();
        filterTask();
        showundo();
    })
    .catch(function(error){
        console.log(error);
        alert("delete failed");
    });
}
function bulkMoveCategory(){
    const category = prompt("Enter category");
    if(category === null){
        return;
    }
    if(category.trim() === ""){
        alert("Category required");
        return;
    }
    const ids = Array.from(selectedtaskids);
    if(ids.length === 0){
        return;
    }
    fetch(url + "/tasks/bulk/category", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ids: ids,
            category: category.trim()
        })
    })
    .then(function(res){
        if(!res.ok){
            throw new Error("Bulk category update failed");
        }
        console.log("Status:", res.status);
        return res.json();
    })
    .then(function(data){
        console.log("Backend response:", data);
        selectedtaskids.clear();
        loadTasks();

    })
    .catch(function(error){
        console.log("Error:", error);
        alert("category update failed");
    });
}