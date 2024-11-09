import React from "react";
import { useNavigate } from "react-router-dom";

export default function Start() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Start Page</h1>
      <button onClick={() => navigate("/userview/chat")}>Let's Go</button>
    </div>
  );
}
