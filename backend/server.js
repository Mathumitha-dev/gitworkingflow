const taskroutes=require("./src/routes/taskRoute.js");
const express=require("express");
const cors=require("cors")
const app = express();
app.use(express.json());
app.use(cors());
app.use(taskroutes);;
app.listen(3000,function(){
    console.log("server is running on port 3000");
})