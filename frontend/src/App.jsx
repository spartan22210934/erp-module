import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  AuthProvider  from "./auth/AuthProvider.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/Dashboard";
import Materials from "./pages/Materials";
import Invoice from "./pages/Invoice";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/materials" element={<ProtectedRoute><Materials /></ProtectedRoute>} />
          <Route path="/invoice" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
