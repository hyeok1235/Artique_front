import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButton } from "../../../style/common_util";

export default function Chat() {
  const navigate = useNavigate();

  return (
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
      <h1>Chat Page</h1>
      <NavigationButton onClick={() => navigate("/userview/letter")}>
        End
      </NavigationButton>
    </div>
  );
}
