import React, { useEffect, useState } from "react";
import api from "../api";
import useAuth from "../auth/useAuth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/admin-dashboard");
        setMessage(res.data.message);
      } catch (err) {
        setMessage("Could not fetch dashboard");
      }
    })();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <p>Welcome — role: <strong>{user?.role}</strong></p>
      <p>{message}</p>

      <nav>
        <Link to="/materials">Materials</Link> {" | "}
        <Link to="/invoice">Invoice</Link>
      </nav>

      <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}
