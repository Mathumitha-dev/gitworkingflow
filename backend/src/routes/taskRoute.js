import express from "express";
import taskcontroller from "../controllers/taskController.js";
const router=express.Router();
router.post("/task", taskcontroller.createTask);
export default router;