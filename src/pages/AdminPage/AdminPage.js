import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AdminDashboard from "../../components/Admin/AdminDashboard";

const AdminPage = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) return <Navigate to="/" replace />;

  return <AdminDashboard />;
};

export default AdminPage;
