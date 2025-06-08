import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "project", required: true },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  deadline: { type: Date, required: true },
  completed: { type: Boolean, default: false }
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;
            