const taskService = require("../services/taskService");

async function createTask(req, res) {
const title = req.body.title;
const description = req.body.description;
const dueDate = req.body.dueDate;
const priority = req.body.priority;
const category = req.body.category;
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
