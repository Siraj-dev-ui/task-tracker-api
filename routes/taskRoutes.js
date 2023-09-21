const express = require("express");
const routes = express.Router();
const controller = require("../controller/taskController");

routes.post("/createTask", controller.createTask);
routes.post("/getTasks", controller.getTasks);
routes.post("/updateTaskStatus", controller.updateTaskStatus);

routes.get("/test", (req, res) => {
  res.send("teams routes working");
});
module.exports = routes;
