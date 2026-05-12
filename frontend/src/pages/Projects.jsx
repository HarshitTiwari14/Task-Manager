import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [selectedProject, setSelectedProject] = useState(null);
  const [memberId, setMemberId] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const fetchProjects = () =>
    api.get("/projects").then(({ data }) => { setProjects(data); setLoading(false); });

  useEffect(() => {
    fetchProjects();
    if (isAdmin) api.get("/projects/users").then(({ data }) => setUsers(data));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post("/projects", form);
    setForm({ title: "", description: "" });
    fetchProjects();
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    await api.post(`/projects/${selectedProject}/members`, { userId: memberId });
    setSelectedProject(null);
    setMemberId("");
    fetchProjects();
  };

  if (loading) return <><Navbar /><div className="page-content"><p>Loading...</p></div></>;

  return (
    <>
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1>Projects</h1>
        </div>

        {isAdmin && (
          <div className="card">
            <h3>Create New Project</h3>
            <form onSubmit={handleCreate} className="inline-form">
              <input
                placeholder="Project title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <input
                placeholder="Description (optional)"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <button type="submit" className="btn btn-primary">Create</button>
            </form>
          </div>
        )}

        {selectedProject && (
          <div className="card">
            <h3>Add Member to Project</h3>
            <form onSubmit={handleAddMember} className="inline-form">
              <select value={memberId} onChange={(e) => setMemberId(e.target.value)} required>
                <option value="">Select user</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                ))}
              </select>
              <button type="submit" className="btn btn-primary">Add</button>
              <button type="button" className="btn btn-secondary" onClick={() => setSelectedProject(null)}>Cancel</button>
            </form>
          </div>
        )}

        <div className="projects-grid">
          {projects.length === 0 && <p>No projects yet.</p>}
          {projects.map((p) => (
            <div key={p._id} className="card project-card">
              <h3>{p.title}</h3>
              <p>{p.description || "No description"}</p>
              <div className="members-list">
                <strong>Members:</strong>{" "}
                {p.members.length === 0 ? "None" : p.members.map((m) => m.name).join(", ")}
              </div>
              {isAdmin && (
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setSelectedProject(p._id)}
                >
                  + Add Member
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
