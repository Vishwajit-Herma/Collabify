import express from "express";
import Task from "../models/Task.js";
import user from "../models/user.model.js";
import multer from "multer";
import mongoose from "mongoose";
const router = express.Router();
const upload = multer({ dest: "uploads/" });
// Assign a Task (Leader Only)
router.post("/assign", upload.single("file"), async (req, res) => {
  console.log("🟢 Request Body:", req.body);
  console.log("🟢 Uploaded File:", req.file);

  const { title, description, projectId, assignedBy, assignedTo, deadline } = req.body;

  // 🛑 Validate required fields
  if (!title || !projectId || !assignedBy || !assignedTo || !deadline) {
    return res.status(400).json({ error: "All required fields must be provided, including deadline." });
  }

  // 🛑 Validate deadline format
  const deadlineDate = new Date(deadline);
  if (isNaN(deadlineDate.getTime())) {
    return res.status(400).json({ error: "Invalid deadline format." });
  }

  try {
    const newTask = new Task({
      title,
      description,
      projectId: new mongoose.Types.ObjectId(projectId),
      assignedBy: new mongoose.Types.ObjectId(assignedBy),
      assignedTo: new mongoose.Types.ObjectId(assignedTo),
      deadline: deadlineDate, // 🆕 Save deadline
      file: req.file ? req.file.filename : null,
    });

    await newTask.save();
    res.status(201).json({ message: "Task assigned successfully!", task: newTask });
  } catch (error) {
    console.error("🔴 Error saving task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:userId/complete", async (req, res) => {
  try {
    const { userId } = req.params;
    const { taskId } = req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, assignedTo: userId },
      { completed: true },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found or already completed" });
    }

    res.json({ message: "Task marked as completed", updatedTask });
  } catch (error) {
    console.error("🔴 Error updating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get tasks assigned to a specific user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // ✅ Ensure userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    // ✅ Fetch tasks assigned to this user
    const tasks = await Task.find({ assignedTo: userId })
      .populate("assignedBy", "email ") // Populate assignedBy (Leader)
      .populate("assignedTo", "email "); // Populate assignedTo (Member)

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Get all tasks for a project
router.get("/project/:projectId", async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId }).populate("assignedTo", "email");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
