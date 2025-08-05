import React from "react";
import useAuth from "../auth/useAuth";
import { Navigate } from "react-router-dom";

export default function AdminOnly({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <div>Forbidden — Admins only</div>;
  return children;
}
