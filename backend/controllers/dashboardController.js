const Task = require("../models/Task");

const getDashboard = async (req, res) => {
  const filter = req.user.role === "member" ? { assignedTo: req.user._id } : {};
  const now = new Date();

  const [total, completed, pending, inProgress, overdue] = await Promise.all([
    Task.countDocuments(filter),
    Task.countDocuments({ ...filter, status: "completed" }),
    Task.countDocuments({ ...filter, status: "pending" }),
    Task.countDocuments({ ...filter, status: "in-progress" }),
    Task.countDocuments({ ...filter, status: { $ne: "completed" }, dueDate: { $lt: now } }),
  ]);

  res.json({ total, completed, pending, inProgress, overdue });
};

module.exports = { getDashboard };
