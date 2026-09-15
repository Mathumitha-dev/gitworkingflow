const express = require("express");

const app = express();

app.use(express.json());

let tasks = [];


app.get("/tasks",(re,res)=>{
    res.json(tasks);
})

app.post("/tasks",(req,res)=>{
    const task={
        title:req.body.title
    }
    tasks.push(task);
    res.json(task);
})









