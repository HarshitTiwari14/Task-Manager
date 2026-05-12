import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const STATUS_COLORS = {
  pending: "orange",
  "in-progress": "blue",
  completed: "green",
};

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", project: "", assignedTo: "", dueDate: "" });
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const fetchTasks = () => api.get("/tasks").then(({ data }) => { setTasks(data); setLoading(false); });

  useEffect(() => {
    fetchTasks();
    api.get("/projects").then(({ data }) => setProjects(data));
    if (isAdmin) api.get("/projects/users").then(({ data }) => setUsers(data));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post("/tasks", form);
    setForm({ title: "", description: "", project: "", assignedTo: "", dueDate: "" });
    fetchTasks();
  };

  const handleStatusChange = async (taskId, status) => {
    await api.put(`/tasks/${taskId}`, { status });
    fetchTasks();
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Delete this task?")) return;
    await api.delete(`/tasks/${taskId}`);
    fetchTasks();
  };

  if (loading) return <><Navbar /><div className="page-content"><p>Loading...</p></div></>;

  return (
    <>
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1>Tasks</h1>
        </div>

        {isAdmin && (
          <div className="card">
            <h3>Create New Task</h3>
            <form onSubmit={handleCreate}>
              <div className="form-row">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    placeholder="Task title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Project</label>
                  <select
                    value={form.project}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                    required
                  >
                    <option value="">Select project</option>
                    {projects.map((p) => <option key={p._id} value={p._id}>{p.title}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Assign To</label>
                  <select
                    value={form.assignedTo}
                    onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                  >
                    <option value="">Select member</option>
                    {users.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  placeholder="Optional description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary">Create Task</button>
            </form>
          </div>
        )}

        <div className="tasks-list">
          {tasks.length === 0 && <p>No tasks yet.</p>}
          {tasks.map((task) => (
            <div key={task._id} className="card task-card">
              <div className="task-header">
                <div>
                  <h4>{task.title}</h4>
                  <p className="task-meta">
                    Project: <strong>{task.project?.title}</strong> |{" "}
                    Assigned to: <strong>{task.assignedTo?.name || "Unassigned"}</strong>
                    {task.dueDate && ` | Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                  </p>
                </div>
                <div className="task-actions">
                  <select
                    className={`status-select status-${STATUS_COLORS[task.status]}`}
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  {isAdmin && (
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task._id)}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
              {task.description && <p className="task-desc">{task.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
