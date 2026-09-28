function selectAllTasks(){
    const selectallcheckbox=document.getElementById("selectAllCheckbox");
    if(selectallcheckbox.checked){
        for(let i=0;i<filteredTaskResults.length;i++){
            selectedtaskids.add(filteredTaskResults[i].id);
        }
    }
    else{
        for(let i=0;i<filteredTaskResults.length;i++){
            selectedtaskids.delete(filteredTaskResults[i].id);
        }
    }
    document.querySelectorAll(".taskSelectCheckbox").forEach(function(taskselectcheckbox,index){
        taskselectcheckbox.checked=selectedtaskids.has(visibletaskids[index]);
    });

    updatebar();

}

function updatebar(){
    const bar=document.getElementById("bulkActionBar");
    const count=document.getElementById("selectedCount");
    const selectallcheckbox=document.getElementById("selectAllCheckbox");
    count.textContent=selectedtaskids.size+" selected";
    if(selectedtaskids.size>0){
        bar.style.display="block";
    }
    else{
        bar.style.display="none";
    }
    let all=true;
    if(visibletaskids.length==0){
        all=false;
    }
    for(let i=0;i<visibletaskids.length;i++){
        if(!selectedtaskids.has(visibletaskids[i])){
            all=false;
        }
    }
    let some=false;
    for(let i=0;i<visibletaskids.length;i++){
        if(selectedtaskids.has(visibletaskids[i])){
            some=true;
        }
    }
    selectallcheckbox.checked=all;
    selectallcheckbox.indeterminate=!all&&some;

}