const Task = require("../models/Task");

const createTask = async (req, res) => {
  const { title, description, assignedTo, project, dueDate } = req.body;
  if (!title || !project) return res.status(400).json({ message: "Title and project required" });
  const task = await Task.create({ title, description, assignedTo, project, dueDate });
  res.status(201).json(task);
};

const getTasks = async (req, res) => {
  const filter = req.query.project ? { project: req.query.project } : {};
  if (req.user.role === "member") filter.assignedTo = req.user._id;
  const tasks = await Task.find(filter)
    .populate("assignedTo", "name email")
    .populate("project", "title");
  res.json(tasks);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  const { title, description, status, assignedTo, dueDate } = req.body;
  if (title) task.title = title;
  if (description !== undefined) task.description = description;
  if (status) task.status = status;
  if (assignedTo) task.assignedTo = assignedTo;
  if (dueDate) task.dueDate = dueDate;
  await task.save();
  res.json(task);
};

const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted" });
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
