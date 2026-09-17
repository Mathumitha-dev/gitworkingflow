import taskroutes from "./src/routes/taskRoute.js";
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use(taskroutes);
app.listen(3000,function(){
    console.log("server is running on port 3000");
});