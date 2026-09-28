let taskCategoryColors=null;

function getCategories(){
    const saved=localStorage.getItem("taskCategories");
    const categories=saved?JSON.parse(saved):{};
    for(let i=0;i<tasks.length;i++){
        const name=(tasks[i].category||"").trim();
        if(name&&!categories[name]){
            categories[name]="#3478f6";
        }
    }
    return categories;
}

function saveCategories(categories){
    localStorage.setItem("taskCategories",JSON.stringify(categories));
    taskCategoryColors=categories;
}

function getCategoryColor(name){
    if(taskCategoryColors===null){
        const saved=localStorage.getItem("taskCategories");
        taskCategoryColors=saved?JSON.parse(saved):{};
    }
    return taskCategoryColors[name]||"#3478f6";
}

function categoryLoad(){
    const categories=getCategories();
    saveCategories(categories);
    const categoryfilter=document.getElementById("categoryfilter");
    const currentFilter=categoryfilter.value;
    categoryfilter.innerHTML='<option value="All">All</option>';
    const categoryinput=document.getElementById("categoryOptions");
    categoryinput.innerHTML="";
    const managecategory=document.getElementById("manageCategorySelect");
    managecategory.innerHTML="";
    const names=Object.keys(categories).sort();
    for(let i=0;i<names.length;i++){
        const name=names[i];
        const option=document.createElement("option");
        option.value=name;
        option.textContent=name;
        categoryfilter.appendChild(option);

        const inputoption=document.createElement("option");
        inputoption.value=name;
        categoryinput.appendChild(inputoption);

        const manageoption=document.createElement("option");
        manageoption.value=name;
        manageoption.textContent=name;
        managecategory.appendChild(manageoption);
    }
    if(names.includes(currentFilter)){
        categoryfilter.value=currentFilter;
    }
    else{
        categoryfilter.value="All";
    }
    if(names.length>0&&!names.includes(managecategory.value)){
        managecategory.value=names[0];
    }
    loadManagedCategoryColor();
    managecategory.disabled=names.length===0;
    document.querySelector('#categorySettings button[onclick="renameCategory()"]')
        .disabled=names.length===0;
    document.querySelector('#categorySettings button[onclick="deleteCategory()"]')
        .disabled=names.length===0;
}

function addCategory(event){
    event.preventDefault();
    const name=document.getElementById("newCategoryName").value.trim();
    const color=document.getElementById("newCategoryColor").value;
    if(!name){
        return;
    }
    const categories=getCategories();
    if(categories[name]){
        alert("That category already exists");
        return;
    }
    categories[name]=color;
    saveCategories(categories);
    document.getElementById("newCategoryName").value="";
    categoryLoad();
    document.getElementById("manageCategorySelect").value=name;
    loadManagedCategoryColor();
}

function loadManagedCategoryColor(){
    const name=document.getElementById("manageCategorySelect").value;
    const categories=getCategories();
    document.getElementById("manageCategoryColor").value=categories[name]||"#3478f6";
}

function changeCategoryColor(){
    const name=document.getElementById("manageCategorySelect").value;
    if(!name){
        return;
    }
    const categories=getCategories();
    categories[name]=document.getElementById("manageCategoryColor").value;
    saveCategories(categories);
    filterTask();
}

function renameCategory(){
    const select=document.getElementById("manageCategorySelect");
    const oldName=select.value;
    if(!oldName){
        return;
    }
    const newName=prompt("Rename category",oldName);
    if(newName===null||!newName.trim()){
        return;
    }
    const trimmedName=newName.trim();
    const categories=getCategories();
    if(trimmedName!==oldName&&categories[trimmedName]){
        alert("That category already exists");
        return;
    }
    const matching=tasks.filter(function(task){
        return task.category===oldName;
    });
    const wasFilteringByCategory=document.getElementById("categoryfilter").value===oldName;
    Promise.all(matching.map(function(task){
        return updateCategoryForTask(task,trimmedName);
    }))
    .then(function(updatedtasks){
        for(let i=0;i<updatedtasks.length;i++){
            replaceTask(updatedtasks[i]);
        }
        categories[trimmedName]=categories[oldName];
        delete categories[oldName];
        saveCategories(categories);
        saveTask();
        categoryLoad();
        if(wasFilteringByCategory){
            document.getElementById("categoryfilter").value=trimmedName;
        }
        filterTask();
        document.getElementById("manageCategorySelect").value=trimmedName;
    })
    .catch(function(error){
        console.log(error);
        alert("Category was not renamed");
    });
}

function deleteCategory(){
    const name=document.getElementById("manageCategorySelect").value;
    if(!name||!confirm('Delete category "'+name+'"? Tasks will become uncategorized.')){
        return;
    }
    const matching=tasks.filter(function(task){
        return task.category===name;
    });
    const wasFilteringByCategory=document.getElementById("categoryfilter").value===name;
    Promise.all(matching.map(function(task){
        return updateCategoryForTask(task,"");
    }))
    .then(function(updatedtasks){
        for(let i=0;i<updatedtasks.length;i++){
            replaceTask(updatedtasks[i]);
        }
        const categories=getCategories();
        delete categories[name];
        saveCategories(categories);
        saveTask();
        categoryLoad();
        if(wasFilteringByCategory){
            document.getElementById("categoryfilter").value="All";
        }
        filterTask();
    })
    .catch(function(error){
        console.log(error);
        alert("Category was not deleted");
    });
}

function updateCategoryForTask(task,category){
    return fetch(url+"/tasks/"+task.id,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            title:task.title,
            description:task.description,
            dueDate:task.due_date?task.due_date.substring(0,10):null,
            priority:task.priority,
            category:category
        })
    }).then(function(response){
        if(!response.ok){
            throw new Error("Task update failed");
        }
        return response.json();
    });
}

function replaceTask(updatedtask){
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].id===updatedtask.id){
            tasks[i]=updatedtask;
            return;
        }
    }
}