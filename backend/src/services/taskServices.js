const pool = require("../db/db.js");
async function createTask(task) {
    const query = `
        insert into tasks (title, description, due_date, priority, category)
        values ('${task.title}', '${task.description}', '${task.dueDate}', '${task.priority}', '${task.category}')`;

    await pool.query(query);
    const getresult=`select * from tasks where title='${task.title}' order by id desc limit 1`;
    const result=await pool.query(getresult);
    return result;
}

module.exports={createTask};
