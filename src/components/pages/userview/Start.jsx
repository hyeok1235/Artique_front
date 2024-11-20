import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButton, ContentButton } from "../../../style/jsx/button";
import "../../../style/background_picture.css";
import WordCloudComponent from "../../section/wordcloud";
import SpeechBubble from "../../../style/jsx/speechbubble";

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
        const nickname = data.data;
        console.log("생성된 닉네임:", nickname); // 콘솔에 닉네임 출력
        // 로컬 스토리지에 닉네임 저장
        localStorage.setItem("nickname", nickname);
        navigate("/userview/chat", { state: { nickname: data.data } }); // 채팅 페이지로 이동
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
        <h1>「별이 빛나는 밤에」</h1>
        <SpeechBubble direction="left">당신을 기다리고 있었어요.</SpeechBubble>
        <br></br>
        <WordCloudComponent />
        {/* <SpeechBubble direction="left">Wanna experience Artique?</SpeechBubble> */}
        <br></br>
        <NavigationButton onClick={handleLetsGoClick}>
          입장하기
        </NavigationButton>{" "}
      </div>
    </div>
  );
}
