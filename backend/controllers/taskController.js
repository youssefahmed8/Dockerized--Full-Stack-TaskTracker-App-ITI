const Task = require("../models/taskModel.js");
const User = require("../models/userModel.js");
const mongoose = require("mongoose");

 const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

 const createTask = async (req, res) => {
  const { title, description, priority, dueDate, userId } = req.body;

  if (!title || !description || !priority || !dueDate || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  try {
    const existingTask = await Task.findOne({ title, user: userId });

    if (existingTask) {
      return res.status(400).json({
        success: false,
        message: "Task with this title already exists for this user",
      });
    }

    const newTask = new Task({
      title,
      description,
      priority,
      dueDate,
      user: userId,
    });

    const savedTask = await newTask.save();

    await User.findByIdAndUpdate(userId, { $push: { tasks: savedTask._id } });

    res.status(201).json({ success: true, data: savedTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error in creating task" });
  }
};

 const updateTask = async (req, res) => {
  const { id } = req.params;
  const taskData = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, taskData, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedTask });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "server Error" });
  }
};

 const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    
    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    await User.findByIdAndUpdate(deletedTask.user, { $pull: { tasks: id } });

    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    console.log("Error in deleting task:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

 const getUserTasks = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("tasks");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, tasks: user.tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching tasks" });
  }
};

 const getCountCompletedTasks = async (req, res) => {
  const { userId } = req.params;
  try {
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const numTasks = await Task.find({ user: userId }).countDocuments();
    const completedTasks = await Task.find({
      user: userId,
      completed: true,
    }).countDocuments();
    res
      .status(200)
      .json({
        success: true,
        completedTasks: completedTasks,
        totalTasks: numTasks,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching tasks" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getUserTasks,
  getCountCompletedTasks,
};