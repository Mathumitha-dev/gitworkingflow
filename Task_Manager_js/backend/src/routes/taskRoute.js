
import taskcontroller from "../controllers/taskController.js";
import express from "express";
const router=express.Router();
router.get("/tasks",taskcontroller.getTasks);
router.post("/tasks",taskcontroller.createTask);
router.put("/tasks/bulk/status",taskcontroller.bulkStatus);
router.delete("/tasks/bulk/delete",taskcontroller.bulkDelete);
router.put("/tasks/bulk/category",taskcontroller.bulkCategory);
router.put("/tasks/:id",taskcontroller.updatetask);
router.delete("/tasks/:id",taskcontroller.deleteTask);
router.put("/tasks/:id/status",taskcontroller.updateStatus);
export default router;

