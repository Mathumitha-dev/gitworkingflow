const taskService = require("../services/taskService");

async function createTask(req, res) {
const body=req.body;
const title = body.title;
const description = body.description;
const dueDate = body.dueDate;
const priority = body.priority;
const category = body.category;
if (!title || title.trim() === "") {
    return res.json({
     message: "Title is required"
    });
}
const task = {
  title: title.trim(),
  description: description,
  dueDate: dueDate,
  priority: priority || "Medium",
  category: category
};

const result = await taskService.createTask(task);
res.json(result.rows[0]);
}
module.exports = {createTask};
