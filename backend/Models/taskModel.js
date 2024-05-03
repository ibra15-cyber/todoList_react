import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: { type: "String" },
    isChecked: {
      type: "Boolean",
      default: false,
    },
  },
  {
    timestamp: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
