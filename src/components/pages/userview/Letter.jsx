import React from "react";
import { useNavigate } from "react-router-dom";

export default function Letter() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Letter Page</h1>
      <button onClick={() => navigate("/userview/qr")}>Complete</button>
    </div>
  );
}
