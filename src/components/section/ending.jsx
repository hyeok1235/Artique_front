import React, { useEffect, useState } from "react";
import "../../style/ending.css"; // 스타일 파일 경로에 맞게 조정

export default function EndingCredits() {
  const [creditsText, setCreditsText] = useState([]);

  useEffect(() => {
    const fetchSentences = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/chat/all_sentences`
        );
        if (!response.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");

        const data = await response.json();
        console.log("받아온 데이터:", data);
        setCreditsText(data.sentences.map((sentence) => sentence.summary)); // 'summary' 배열로 설정
      } catch (error) {
        console.error("API 요청 중 오류:", error);
      }
    };

    fetchSentences();
  }, []);

  return (
    <div className="credits-container">
      <div className="credits-text">
        {creditsText.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  );
}
