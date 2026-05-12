const Project = require("../models/Project");
const User = require("../models/User");

const createProject = async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });
  const project = await Project.create({ title, description, createdBy: req.user._id });
  res.status(201).json(project);
};

const getProjects = async (req, res) => {
  let projects;
  if (req.user.role === "admin") {
    projects = await Project.find().populate("members", "name email");
  } else {
    projects = await Project.find({ members: req.user._id }).populate("members", "name email");
  }
  res.json(projects);
};

const getProject = async (req, res) => {
  const project = await Project.findById(req.params.id).populate("members", "name email");
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
};

const addMember = async (req, res) => {
  const { userId } = req.body;
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  if (project.members.includes(userId))
    return res.status(400).json({ message: "User already a member" });
  project.members.push(userId);
  await project.save();
  res.json(project);
};

const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

module.exports = { createProject, getProjects, getProject, addMember, getUsers };
