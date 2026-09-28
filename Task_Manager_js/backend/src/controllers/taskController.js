
import taskService from "../services/taskService.js";

async function getTasks(req,res){
    const result=await taskService.getTasks();
    res.json(result.rows);
}

async function createTask(req,res){
    const body=req.body;
    const title=body.title;
    const description=body.description;
    const dueDate=body.dueDate;
    const priority=body.priority;
    const category=body.category;

    if(!title||title.trim()===""){
        return res.json({
            message:"Title is required"
        });
    }

    const task={
        title:title.trim(),description:description,dueDate:dueDate, priority:priority||"Medium", category:category
    };
    const result=await taskService.createTask(task);
    res.json(result.rows[0]);
}

async function updatetask(req,res){
    const body=req.body;
    const id=req.params.id;
    const title=body.title;
    const description=body.description;
    const dueDate=body.dueDate;
    const priority=body.priority;
    const category=body.category;
    if(!title||title.trim()===""){
        return res.json({
            message:"Title is required"
        });
    }
    const task={
        title:title.trim(),description:description,dueDate:dueDate,priority:priority||"Medium",category:category
    };

    const result=await taskService.updatetask(id,task);
    res.json(result.rows[0]);
}

async function deleteTask(req,res){
    const id=req.params.id;
    await taskService.deleteTask(id);

    res.json({
        message:"deleted successfully"
    });
}

async function updateStatus(req,res){
    const body=req.body;
    const id=req.params.id;
    const status=body.status;
    const result=await taskService.updateStatus(id,status);
    res.json(result.rows[0]);
}

async function bulkStatus(req,res){
    try{
        const body=req.body;
        const ids=body.ids;
        const status=body.status;

        const result=await taskService.bulkStatus(ids,status);
        res.json(result.rows);
    }
    catch(error){
        console.log(error);
    }
}
async function bulkDelete(req,res){
    const body=req.body;
    const ids=body.ids;
    await taskService.bulkDelete(ids);
    res.json({
        message:"deleted successfully"
    });
}

async function bulkCategory(req,res){
    const body=req.body;
    const ids=body.ids;
    const category=body.category;
    const result=await taskService.bulkCategory(ids,category);
    res.json(result.rows);
}

export default {getTasks,createTask,updatetask,deleteTask,updateStatus,bulkStatus,bulkDelete,bulkCategory};

