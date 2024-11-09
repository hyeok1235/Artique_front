import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButton, ContentButton } from "../../../style/buttom";
import "../../../style/background_picture.css";

const Letter = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 텍스트 인덱스
  const [canvasUrl, setCanvasUrl] = useState("");
  const navigate = useNavigate();

  const textOptions = [
    "밤하늘을 올려다볼 때, 별들은 고독 속에서 빛나는 희망을 속삭여준다. 내 그림 속 별들이 그랬던 것처럼.",
    "고통 속에서 그려진 그림은, 누군가의 마음에 닿아 그를 위로할 힘을 가진다.",
    "내 삶이란 하늘에 남긴 붓질이었을 뿐, 그러나 그 별빛이 누군가의 마음에 닿는다면 그걸로 충분하지 않을까.",
    "밤하늘은 내 감정이 머무는 캔버스였고, 별빛은 그 위에 남긴 내 위로였다.",
    "비록 아무도 나의 그림을 이해하지 못했지만, 시간이 흘러 그 안의 빛을 알아봐 주는 이가 있으니, 내 삶이 헛되지 않았다고 믿고 싶다.",
  ];

  // 현재 인덱스에 따라 선택된 텍스트 업데이트
  useEffect(() => {
    setSelectedText(textOptions[currentIndex]);
  }, [currentIndex]);

  // 다음 텍스트로 이동
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
  };

  // 이전 텍스트로 이동
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? textOptions.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const createImageWithText = async () => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src =
        "https://cors-anywhere.herokuapp.com/https://artique-bucket.s3.ap-northeast-2.amazonaws.com/pictures/b34c3722b18d48bd87e66c9686caec25.png";

      img.onload = () => {
        setImageSrc(img.src);

        const scale = 5;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // 검정색 반투명 배경 추가
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, img.width, img.height);

        ctx.font = "7px Pretendard";
        ctx.fillStyle = "white";
        ctx.textAlign = "center"; // 텍스트를 중앙 정렬
        ctx.textBaseline = "middle"; // 텍스트를 수직 중앙에 정렬

        //문구 너무 길면 줄바꿈하기 위한 코드 시작!!!!!!!
        const maxWidth = img.width - 40; // 텍스트 너비 제한
        const lineHeight = 10;
        const x = img.width / 2;
        const y = img.height / 2;
        // 텍스트를 자동 줄바꿈하는 함수
        const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
          const words = text.split(" ");
          let line = "";
          let lines = [];

          for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + " ";
            let metrics = ctx.measureText(testLine);
            let testWidth = metrics.width;
            if (testWidth > maxWidth && i > 0) {
              lines.push(line);
              line = words[i] + " ";
            } else {
              line = testLine;
            }
          }
          lines.push(line);

          for (let j = 0; j < lines.length; j++) {
            ctx.fillText(
              lines[j],
              x,
              y + j * lineHeight - ((lines.length - 1) * lineHeight) / 2
            );
          }
        };

        wrapText(ctx, selectedText, x, y, maxWidth, lineHeight);
        //줄바꿈 코드 끝!!!!!!!
        const dataUrl = canvas.toDataURL();
        setCanvasUrl(dataUrl);

        const googleChartAPI = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          dataUrl
        )}&size=200x200`;
        setQrCodeUrl(googleChartAPI);
      };

      img.onerror = () => {
        console.error("이미지 로드 실패");
      };
    };

    createImageWithText();
  }, [selectedText]);

  return (
    <div className="start-page">
      <div style={{ textAlign: "center" }}>
        <h1>작품과 당신의 순간을 영원히 간직할 수 있도록.</h1>

        {/* 텍스트가 추가된 이미지 */}
        {canvasUrl && (
          <div>
            <p>
              당신과 고흐의 대화에서 추출된 요약 내용입니다. 원하는 문구를
              골라보세요.
            </p>
            <img
              src={canvasUrl}
              alt="Image with text"
              style={{ width: "350px" }}
            />
          </div>
        )}
        {/* 멘트 고르기~~~~~~~ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ContentButton onClick={handlePrevious}>{"<"}</ContentButton>
          <p style={{ margin: "0 2px" }}>{selectedText}</p>
          <ContentButton onClick={handleNext}>{">"}</ContentButton>
        </div>
        {/* QR 코드 이미지
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />} */}

        {/* 완료 버튼 */}
        <NavigationButton onClick={() => navigate("/userview/qr")}>
          완료
        </NavigationButton>
      </div>
    </div>
  );
};

export default Letter;
