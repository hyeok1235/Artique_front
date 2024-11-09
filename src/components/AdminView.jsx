import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "./pages/adminview/AdminLogin";
import AdminList from "./pages/adminview/AdminList";
import AdminRegister from "./pages/adminview/AdminRegister";

export default function AdminView() {
  return (
    <div>
      <Routes>
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<AdminLogin />} />
        <Route path="list" element={<AdminList />} />
        <Route path="register" element={<AdminRegister />} />
      </Routes>
    </div>
  );
}
