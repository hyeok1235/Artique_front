import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButton, ContentButton } from "../../../style/button";
import "../../../style/background_picture.css";
import WordCloudComponent from "../../section/wordcloud";
import SpeechBubble from "../../../style/speechbubble";

export default function Start() {
  const navigate = useNavigate();

  const handleLetsGoClick = () => {
    fetch("https://www.rivestsoft.com/nickname/getRandomNickname.ajax", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lang: "ko" }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("생성된 닉네임:", data.data); // 콘솔에 닉네임 출력
        navigate("/userview/chat"); // 채팅 페이지로 이동
      })
      .catch((error) => {
        console.error("네트워크 오류:", error);
      });
  };

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
        <NavigationButton onClick={handleLetsGoClick}>
          Let's Go
        </NavigationButton>{" "}
      </div>
    </div>
  );
}
