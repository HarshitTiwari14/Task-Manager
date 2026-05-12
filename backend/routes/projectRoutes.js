const express = require("express");
const router = express.Router();
const { createProject, getProjects, getProject, addMember, getUsers } = require("../controllers/projectController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/users", protect, adminOnly, getUsers);
router.post("/", protect, adminOnly, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProject);
router.post("/:id/members", protect, adminOnly, addMember);

module.exports = router;
