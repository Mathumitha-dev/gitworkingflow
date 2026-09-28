let searchtimer=null;
function filterTask(){
    const status=document.getElementById("statusfilter").value;
    const priority=document.getElementById("priorityfilter").value;
    const category=document.getElementById("categoryfilter").value;
    const search=document.getElementById("searchinput").value.toLowerCase();
    const filtered=[];
    for(let i=0;i<tasks.length;i++){
        const task=tasks[i];
    if(status!=="All"){
        if(task.status!==status){
                continue;
            }  
        }
    if(priority!=="All"){
         if(task.priority!==priority){
            continue;
            }
        }
        if(category!=="All"){
            if(task.category!==category){
             continue; 
            }
        }
        if(search!==""){ 
            const title=task.title.toLowerCase(); 
            const description=(task.description||"").toLowerCase(); 
            if(!title.includes(search) && !description.includes(search)){ 
                continue; 
            } 
        }
        filtered.push(task);
    }
    const s=document.getElementById("sortfilter").value;
    const sorted=[];
    for(let i=0;i<filtered.length;i++){
        sorted.push(filtered[i]);   
    }
    function duesoon(task1,task2){
        const t1=new Date(task1.due_date);
        const t2=new Date(task2.due_date);
        return t1-t2;
    }
    function duel(task1,task2){
        const t1=new Date(task1.due_date);
        const t2=new Date(task2.due_date);
        return t2-t1;
    }
    function plow(task1,task2){
        const p1=prioritydata(task1.priority);
        const p2=prioritydata(task2.priority);
        return p1-p2;
    }
    function phigh(task1,task2){
        const p1=prioritydata(task1.priority);
        const p2=prioritydata(task2.priority);
        return p2-p1;
    }
    function prioritydata(p){
        if(p=="Low"){
            return 1;
        }
        if(p=="Medium"){
            return 2;
        }
        if(p=="High"){
            return 3;
        }
    }
    function createold(task1,task2){
        const c1=new Date(task1.created_at);
        const c2=new Date(task2.created_at);
        return c1-c2;
    }
    function createnew(task1,task2){
        const c1=new Date(task1.created_at);
        const c2=new Date(task2.created_at);
        return c2-c1;
    }
    if(s=="ds"){
        sorted.sort(duesoon);
    }
    else if(s=="dl"){
        sorted.sort(duel);
    }
    else if(s=="prlow"){
        sorted.sort(plow);
    }
    else if(s=="prhigh"){
        sorted.sort(phigh);
    }
    else if(s=="cold"){
        sorted.sort(createold);
    }
    else if(s=="cnew"){
        sorted.sort(createnew);
    }
    const params=new URLSearchParams();
    if(status!=="All"){
        params.set("status",status);
    }
    if(priority!=="All"){
        params.set("priority",priority);
    }
    if(category!=="All"){
        params.set("category",category);
    }
    const query=params.toString();
    if(query){
        history.replaceState(null,"","?"+query);
    }
    else{
        history.replaceState(null,"",window.location.pathname);
    }
    const tasklist=document.getElementById("tasklist");
    tasklist.innerHTML="";
    vid=[];
    for(let i=0;i<sorted.length;i++){
        showtask(sorted[i]);
    }
    updatebar();
}

function searching(){
    clearTimeout(searchtimer);
    searchtimer=setTimeout(function(){
         filterTask(); 
        },300);
}
function categoryLoad(){
    const category=document.getElementById("categoryfilter");
    category.innerHTML=`<option value="All">All</option>`
    const categories=[];
      for(let i=0;i<tasks.length;i++){
        if(tasks[i].category){
            if(!categories.includes(tasks[i].category)){
                categories.push(tasks[i].category);
            }
        }
     }
    for(let i=0;i<categories.length;i++){
        const option=document.createElement("option");
        option.value=categories[i];
        option.textContent=categories[i];
        category.appendChild(option);
    }
}
function filterLoad(){
    const params=new URLSearchParams(window.location.search);
    const status=params.get("status");
    const priority=params.get("priority");
    const category=params.get("category");
    if(status){
        document.getElementById("statusfilter").value=status;
    }
    if(priority){ 
        document.getElementById("priorityfilter").value=priority;
    }
    if(category){ 
        document.getElementById("categoryfilter").value=category;
    }
}
