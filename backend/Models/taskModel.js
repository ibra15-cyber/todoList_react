import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: { type: "String" },
  },
  {
    timestamp: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
