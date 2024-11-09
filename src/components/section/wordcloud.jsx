import React, { useEffect, useRef } from "react";
import WordCloud from "wordcloud";

// 목업 데이터
const words = [
  ["React", 20],
  ["JavaScript", 25],
  ["Frontend", 15],
  ["Backend", 10],
  ["API", 18],
  ["Visualization", 22],
  ["Component", 12],
  ["Development", 17],
  ["Mockup", 8],
  ["aaa", 20],
  ["bbbbbbbbb", 25],
  ["ccccc", 15],
  ["ddddddd", 10],
  ["eeeeeee", 18],
  ["fffff", 20],
  ["gggggg", 25],
  ["hhhhhhh", 15],
  ["iiiiiiiiii", 10],
  ["jjj", 18],
];

export default function WordCloudComponent() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // 고해상도를 위해 실제 크기 설정 (2배)
    canvas.width = 500; // 해상도 높이기 위해 가로 크기 증가
    canvas.height = 500; // 해상도 높이기 위해 세로 크기 증가
    canvas.style.width = "100%";
    canvas.style.height = "400px"; // CSS 크기는 그대로 유지

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
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "400px" }} />;
}
