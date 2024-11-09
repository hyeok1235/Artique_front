import React, { useEffect, useRef, useState } from "react";
import WordCloud from "wordcloud";

export default function WordCloudComponent() {
  const canvasRef = useRef(null);
  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchSentences = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/chat/all_sentences`
        );
        if (!response.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");

        const data = await response.json();
        console.log("받아온 데이터:", data);

        // API 응답에서 필요한 형태로 데이터 가공
        const wordList = data.sentences.map((sentence) => [
          sentence.summary,
          Math.floor(Math.random() * 20) + 10, // 가중치 랜덤값 설정
        ]);
        setWords(wordList);
      } catch (error) {
        console.error("API 요청 중 오류:", error);
      }
    };

    fetchSentences();
  }, []);

  useEffect(() => {
    if (!words.length) return;

    const canvas = canvasRef.current;
    console.log("Word Cloud Data:", words);

    canvas.width = 500; // 해상도 높이기 위해 가로 크기 증가
    canvas.height = 500; // 해상도 높이기 위해 세로 크기 증가
    canvas.style.width = "100%";
    canvas.style.height = "400px";

    // 워드클라우드 생성
    WordCloud(canvas, {
      list: words,
      gridSize: 17,
      weightFactor: 2,
      fontFamily: "Pretendard",
      color: "white",
      backgroundColor: null,
      rotateRatio: 0.5,
      rotationSteps: 5,
    });

    // 배경을 투명하게 설정
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [words]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "400px" }} />;
}
