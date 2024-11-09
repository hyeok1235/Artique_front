import React from "react";
import { useNavigate } from "react-router-dom";

export default function Qr() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>QR Page</h1>
      <button onClick={() => navigate("/userview/last")}>Next</button>
    </div>
  );
}
