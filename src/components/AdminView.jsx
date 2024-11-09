import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/adminview/AdminLogin";
import AdminList from "./pages/adminview/AdminList";
import AdminRegister from "./pages/adminview/AdminRegister";

export default function AdminView() { // 컴포넌트 이름 변경
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
