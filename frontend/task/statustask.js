function toggleStatus(task,taskname,statuscheckbox){
    let status;
    if(statuscheckbox.checked){
        status="Completed";
    }
    else{
        status="Pending";
    }
   if(statuscheckbox.checked){
        taskname.style.textDecoration="line-through";
    }
   else{
        taskname.style.textDecoration="none";
    }
    fetch(url+"/tasks/"+task.id+"/status",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            status:status
        })
   }).then(function(res){
     return res.json();
    })
    .then(function(updatedtask){
        task.status=updatedtask.status;
        statuscheckbox.checked=updatedtask.status==="Completed";
        saveTask();
    })
    .catch(function(error){
        console.log(error);
        alert("Statusnot updated");
    });

}