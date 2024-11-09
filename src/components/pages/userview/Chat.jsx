import React from "react";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Chat Page</h1>
      <button onClick={() => navigate("/userview/letter")}>End</button>
    </div>
  );
}
