import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Start from "./pages/userview/Start";
import Chat from "./pages/userview/Chat";
import Letter from "./pages/userview/Letter";
import Qr from "./pages/userview/Qr";
import Last from "./pages/userview/Last";

export default function UserView() {
  return (
    <div>
      <h1>UserView</h1>
      <Routes>
        <Route index element={<Navigate to="start" />} />
        <Route path="start" element={<Start />} />
        <Route path="chat" element={<Chat />} />
        <Route path="letter" element={<Letter />} />
        <Route path="qr" element={<Qr />} />
        <Route path="last" element={<Last />} />
      </Routes>
    </div>
  );
}
