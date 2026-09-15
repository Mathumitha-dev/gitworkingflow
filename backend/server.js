const express = require("express");

const app = express();

app.use(express.json());

let tasks = [];
app.get("/tasks", getTasks);



function getTasks(req, res) {
    res.json(tasks);
}

function addTask(req, res) {
    const task = {
        title: req.body.title
    };
    tasks.push(task);
    res.json(task);
}

app.post("/tasks", addTask);









