// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import Cookie from "cookie-universal";

const ProtectedRoute = ({ children }) => {
  const cookie = Cookie();
  const token = cookie.get("token");

  if (!token) {
    return <Navigate replace to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
