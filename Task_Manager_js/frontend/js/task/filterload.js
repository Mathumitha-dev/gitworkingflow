function filterLoad(){
    const params=new URLSearchParams(window.location.search);
    const status=params.get("status");
    const priority=params.get("priority");
    const category=params.get("category");
    const statusfilter=document.getElementById("statusfilter");
    if(status&&Array.from(statusfilter.options).some(function(option){
        return option.value===status;
    })){
        statusfilter.value=status;
    }
    const priorityfilter=document.getElementById("priorityfilter");
    if(priority&&Array.from(priorityfilter.options).some(function(option){
        return option.value===priority;
    })){
        priorityfilter.value=priority;
    }
    const categoryfilter=document.getElementById("categoryfilter");
    if(category&&Array.from(categoryfilter.options).some(function(option){
        return option.value===category;
    })){
        categoryfilter.value=category;
    }

}