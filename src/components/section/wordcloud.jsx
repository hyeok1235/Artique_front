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

        // 문장을 단어로 나누고 단어 리스트 생성
        const wordList = [];
        data.sentences.forEach((sentence) => {
          const words = sentence.summary.split(" ");
          words.forEach((word) => {
            // 단어를 개별 가중치와 함께 추가 (랜덤 가중치 또는 특정 규칙 적용)
            wordList.push([word, Math.floor(Math.random() * 20) + 10]);
          });
        });
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
    canvas.width = 500;
    canvas.height = 500;
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
  }, [words]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "400px" }} />;
}
