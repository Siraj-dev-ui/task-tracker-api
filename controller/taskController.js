const Task = require("../model/task");
const jwt = require("jsonwebtoken");

// register user

exports.createTask = async (req, res) => {
  try {
    const newTask = new Task({
      name: req.body.name.trim(),
      description: req.body.description.trim(),
      priority: req.body.priority.trim(),
      user_Id: req.body.user_Id,
    });
    const task = await Task.create(newTask);
    res.json({
      status: "success",
      message: "Task Created Successfully...",
      task: task,
    });
  } catch (err) {
    console.log("error in creating task", err);
    res.status(500).json({ status: "failed", message: err });
  }
};

exports.getTasks = async (req, res) => {
  const { _id } = req.body;

  const tasks = await Task.find({ user_Id: _id });

  if (tasks) {
    res.json({ status: "success", tasks: tasks });
  } else {
    res.json({ status: "failed", message: "no task available" });
  }
};
exports.updateTaskStatus = async (req, res) => {
  const { _id, status } = req.body;

  //   const tasks = await Task.find({ user_Id: _id });
  const task = await Task.updateOne(
    { _id: _id },
    {
      $set: {
        status: status === "in-complete" ? "completed" : "in-complete",
      },
    }
  );

  if (task) {
    res.json({ status: "success", task: task });
  } else {
    res.json({ status: "failed", message: "no task available" });
  }
};
