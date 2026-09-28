function loadTasks(){
    const loadingmessage=document.getElementById("loadingMessage");
    const errormessage=document.getElementById("errorMessage");
    loadingmessage.style.display="block";
    errormessage.style.display="none";
    const savedtasks=localStorage.getItem("tasks");
    fetch(url+"/tasks")
    .then(function(res){
        if(!res.ok){
            throw new Error("Failed to load tasks");
        }
        return res.json();
    })
    .then(function(data){
        if(!Array.isArray(data)){
            throw new Error("Invalid task response");
        }
        loadingmessage.style.display="none";
        tasks=data;
        const taskorder=JSON.parse(localStorage.getItem("taskOrder")||"[]");
        if(Array.isArray(taskorder)&&taskorder.length>0){
            const ordermap=new Map();
            for(let i=0;i<taskorder.length;i++){
                ordermap.set(String(taskorder[i]),i);
            }
            tasks.sort(function(task1,task2){
                const position1=ordermap.has(String(task1.id))?ordermap.get(String(task1.id)):Number.MAX_SAFE_INTEGER;
                const position2=ordermap.has(String(task2.id))?ordermap.get(String(task2.id)):Number.MAX_SAFE_INTEGER;
                return position1-position2;
            });
        }
        saveTask();
        categoryLoad();
        filterLoad();
        filterTask();
    })
    .catch(function(error){
        console.log(error);
        loadingmessage.style.display="none";
        if(savedtasks){
            try{
                const cachedtasks=JSON.parse(savedtasks);
                if(Array.isArray(cachedtasks)){
                    tasks=cachedtasks;
                    categoryLoad();
                    filterLoad();
                    filterTask();
                }
            }
            catch(cacheerror){
                console.log(cacheerror);
            }
        }
        errormessage.style.display="block";
    });
}

loadTasks();