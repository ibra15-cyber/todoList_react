import express from "express";
import Task from "../Models/taskModel.js";

const taskRouter = express.Router();

taskRouter.get("/", async (req, res) => {
  const tasks = await Task.find();
  // console.log(tasks);

  res.send(tasks);
});

//not used in the front end
taskRouter.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);

  res.send(task);
});

taskRouter.post("/add", async (req, res) => {
  const task = req.body.task;
  // if (task === "") {
  //   return;
  // }
  // const findtask = Task.findOne(req.body.task);
  // if (findtask) {
  //   res.send({ message: "Task already exists}" });
  //   return;
  // }
  const newTask = new Task({
    task: task,
  });

  await newTask.save();

  res.send(newTask);
});

taskRouter.delete("/:id", async (req, res) => {
  const tasktobedeleted = await Task.findById(req.params.id);

  try {
    if (!tasktobedeleted) {
      return res.status(404).send({ message: "Task not found" });
    }
    // console.log(tasktobedeleted);
    await tasktobedeleted.deleteOne();
  } catch (err) {
    res.send({ message: err.message });
  }

  res.send(tasktobedeleted);
});

export default taskRouter;
