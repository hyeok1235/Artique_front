import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButton, ContentButton } from "../../../style/buttom";
import "../../../style/background_picture.css";
import WordCloudComponent from "../../section/wordcloud";
import SpeechBubble from "../../../style/speechbubble";

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
        <h1>당신을 기다리고 있었어요.</h1>
        <WordCloudComponent />
        <SpeechBubble direction="left">Wanna experience Artique?</SpeechBubble>
        <NavigationButton onClick={() => navigate("/userview/chat")}>
          Let's Go
        </NavigationButton>{" "}
      </div>
    </div>
  );
}
