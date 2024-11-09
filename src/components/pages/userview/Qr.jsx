import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButton } from "../../../style/common_util";
import "../../../style/background_picture.css";

export default function Qr() {
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
        <h1>QR Page</h1>
        <NavigationButton onClick={() => navigate("/userview/last")}>
          Next
        </NavigationButton>
      </div>
    </div>
  );
}
