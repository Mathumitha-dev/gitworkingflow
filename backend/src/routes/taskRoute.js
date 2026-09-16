
const taskcontroller=require("../controllers/taskController.js");
const express=require("express");
const router=express.Router();
router.post("/task", taskcontroller.createTask);
module.exports=router;