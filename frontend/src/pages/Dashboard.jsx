import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    api.get("/dashboard").then(({ data }) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <><Navbar /><div className="page-content"><p>Loading...</p></div></>;

  const cards = [
    { label: "Total Tasks", value: stats.total, color: "blue" },
    { label: "Completed", value: stats.completed, color: "green" },
    { label: "Pending", value: stats.pending, color: "orange" },
    { label: "In Progress", value: stats.inProgress, color: "purple" },
    { label: "Overdue", value: stats.overdue, color: "red" },
  ];

  return (
    <>
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.name}!</p>
        </div>
        <div className="stats-grid">
          {cards.map((card) => (
            <div key={card.label} className={`stat-card stat-${card.color}`}>
              <div className="stat-value">{card.value}</div>
              <div className="stat-label">{card.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
