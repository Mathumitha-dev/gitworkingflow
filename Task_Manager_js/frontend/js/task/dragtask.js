function enableDrag(singleElement){
    const tasklist=document.getElementById("tasklist");
    const taskselements=singleElement?[singleElement]:tasklist.children;
    for(let i=0;i<taskselements.length;i++){
        const taskelement=taskselements[i];
        taskelement.draggable=document.getElementById("sortfilter").value==="none";
        taskelement.ondragstart=function(){
            taskelement.className="task dragging";
        };
        taskelement.ondragend=function(){
            taskelement.className="task";
            saveTaskOrder();
        };
    }
    tasklist.ondragover=function(event){
        event.preventDefault();
        let dragging=document.getElementsByClassName("dragging")[0];
        if(!dragging){
            return;
        }
        let tasksonthepage=tasklist.children;
        for(let i=0;i<tasksonthepage.length;i++){
            let currenttask=tasksonthepage[i];
            if(currenttask===dragging){
                continue;
            }
            let position=currenttask.getBoundingClientRect();
            if(event.clientY<position.top+position.height/2){
                tasklist.insertBefore(dragging,currenttask);
                return;
            }
        }
        tasklist.appendChild(dragging);
    };
}


function saveTaskOrder(){
    const tasklist=document.getElementById("tasklist");
    const orderedtaskids=[];
    for(let i=0;i<tasklist.children.length;i++){
        const taskid=tasklist.children[i].getAttribute("data-id");
        orderedtaskids.push(String(taskid));
    }
    const orderedtaskidsset=new Set(orderedtaskids);
    const tasksbyid=new Map();
    for(let i=0;i<tasks.length;i++){
        tasksbyid.set(String(tasks[i].id),tasks[i]);
    }
    const orderedtasks=[];
    for(let i=0;i<orderedtaskids.length;i++){
        if(tasksbyid.has(orderedtaskids[i])){
            orderedtasks.push(tasksbyid.get(orderedtaskids[i]));
        }
    }
    let orderedindex=0;
    tasks=tasks.map(function(task){
        if(orderedtaskidsset.has(String(task.id))){
            return orderedtasks[orderedindex++];
        }
        return task;
    });
    saveTask();
    filterTask();
}