import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButton, ContentButton } from "../../../style/common_util";
import "../../../style/background_picture.css";

export default function Start() {
  const navigate = useNavigate();

  return (
    <div className="start-page">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // 화면의 중앙에 세로 정렬
          textAlign: "center",
        }}
      >
        <h1>Start Page</h1>
        <ContentButton>Wanna experience Artique?</ContentButton>
        <NavigationButton onClick={() => navigate("/userview/chat")}>
          Let's Go
        </NavigationButton>{" "}
      </div>
    </div>
  );
}
