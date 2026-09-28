
import pool from "../db/db.js";

async function getTasks() {
    const query=`select * from tasks order by id`;
    const result=await pool.query(query);
    return result;
}

async function createTask(task) {
    const query=`insert into tasks (title, description, due_date, priority, category)
    values ($1, $2, $3, $4, $5)`;
    const values=[task.title,task.description,task.dueDate,task.priority,task.category];
    await pool.query(query,values);

    const getresult=`select * from tasks where title=$1 order by id desc limit 1`;
    const result=await pool.query(getresult,[task.title]);
    return result;
}

async function updatetask(id,task){
    const query=`update tasks set title=$1,description=$2,due_date=$3,priority=$4,category=$5 where id=$6`;
    const values=[task.title,task.description,task.dueDate,task.priority,task.category,id];
    await pool.query(query,values);
    const result=await pool.query(`select * from tasks where id=$1`,[id]);
    return result;
}

async function deleteTask(id){
    const query=`delete from tasks where id=$1`;
    await pool.query(query,[id]);
}

async function updateStatus(id,status){
    const query=`update tasks set status=$1 where id=$2`;
    await pool.query(query,[status,id]);
    const result=await pool.query(`select * from tasks where id=$1`,[id]);
    return result;
}

async function bulkStatus(ids,status){
    const query=`update tasks set status=$1 where id=ANY($2)`;
    await pool.query(query,[status,ids]);

    const result=await pool.query(`select * from tasks where id=ANY($1)`,[ids]);
    return result;
}
async function bulkDelete(ids){
    const query=`delete from tasks where id=ANY($1)`;
    await pool.query(query,[ids]);
}
async function bulkCategory(ids,category){
    const query=`update tasks set category=$1 where id=ANY($2)`;
    await pool.query(query,[category,ids]);
    const result=await pool.query(`select * from tasks where id=ANY($1)`,[ids]);
    return result;
}
export default {getTasks,createTask,updatetask,deleteTask,updateStatus,bulkStatus,bulkDelete,bulkCategory};

