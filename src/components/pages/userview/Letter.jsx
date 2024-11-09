import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButton, ContentButton } from "../../../style/jsx/button";
import "../../../style/background_picture.css";
import FilmWithHoles from "../../../style/jsx/film";
import Polaroid from "../../../style/jsx/polaroid";
import fetchSummaries from "../../../api/nickname_api";

const Letter = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 텍스트 인덱스
  const [canvasUrl, setCanvasUrl] = useState("");
  const [textOptions, setTextOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSummaries = async () => {
      try {
        const summaries = await fetchSummaries();
        setTextOptions(summaries || []);
        setSelectedText(
          summaries && summaries.length > 0
            ? summaries[0]
            : "요약 문장을 불러오는 데 실패했습니다."
        );
      } catch (error) {
        console.error("요약 문장을 불러오는 중 오류 발생:", error);
      }
    };

    loadSummaries();
  }, []);

  // 현재 인덱스에 따라 선택된 텍스트 업데이트
  useEffect(() => {
    setSelectedText(textOptions[currentIndex]);
  }, [currentIndex, textOptions]);

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

        // `selectedText`가 정의되어 있을 때만 `wrapText` 호출
        if (selectedText) {
          wrapText(ctx, selectedText, x, y, maxWidth, lineHeight);
        }
        //줄바꿈 코드 끝!!!!!!!

        setCanvasUrl(canvas.toDataURL());
      };

      img.onerror = () => {
        console.error("이미지 로드 실패");
      };
    };

    createImageWithText();
  }, [selectedText]);

  // 완료 버튼 클릭 시 canvasUrl을 확인하고 전달(기기에 다운/백에 post/navigateto QR)
  // navigate 버튼 클릭 시 canvasUrl을 확인하고 전달
  const handleNavigateToQr = async () => {
    if (!canvasUrl) {
      console.error("canvasUrl이 생성되지 않았습니다.");
      return;
    }

    try {
      // 1. 기기에 다운로드
      const img = new Image();
      img.src = canvasUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const canvasWidth = img.width + 40; // 폴라로이드 프레임을 위한 여백
        const canvasHeight = img.height + 80; // 하단 여백 포함

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // 폴라로이드 배경 그리기
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // 그림자 효과
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;

        // 이미지 그리기
        ctx.drawImage(img, 20, 20, img.width, img.height); // 상하좌우 여백 적용

        // 텍스트 추가
        ctx.shadowBlur = 0; // 텍스트에는 그림자 없음
        ctx.fillStyle = "black";
        ctx.font = "16px Pretendard";
        ctx.textAlign = "center";
        ctx.fillText("2024. 11. 10.", canvasWidth / 2, canvasHeight - 20); // 하단 중앙에 날짜 텍스트

        // Blob 형태로 변환하여 다운로드
        canvas.toBlob(async (blob) => {
          // 다운로드
          const downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = "polaroid_image.png";
          downloadLink.click();

          // 2. 백엔드에 이미지 전송
          const formData = new FormData();
          formData.append("combined_picture", blob, "polaroid_image.png");

          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/combined_picture/upload_combined_picture`,

            {
              method: "POST",
              body: formData,
            }
          );
          if (!response.ok) throw new Error("파일 업로드 실패");

          const result = await response.json();
          const photoUrl = result.photo_url;
          console.log(result);

          // 3. navigate로 다음 페이지로 이동
          navigate("/userview/qr", { state: { photoUrl } });
        }, "image/png");
      };
    } catch (error) {
      console.error("다운로드 또는 업로드 중 오류:", error);
    }
  };

  return (
    <div className="start-page">
      <div style={{ textAlign: "center" }}>
        <h1>작품과 당신의 순간을 영원히 간직할 수 있도록.</h1>

        {/* 텍스트가 추가된 이미지 */}
        {canvasUrl && (
          <div>
            <p>
              방금 전 대화에서 추출된 요약 내용입니다. 원하는 문구를 골라보세요.
            </p>
            {/* <FilmWithHoles>
              <img
                src={canvasUrl}
                alt="Image with text"
                style={{ width: "350px" }}
              />
            </FilmWithHoles> */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px",
              }}
            >
              <Polaroid src={canvasUrl} />
            </div>
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

        {/* 완료 버튼 */}
        <NavigationButton onClick={handleNavigateToQr}>완료</NavigationButton>
      </div>
    </div>
  );
};

export default Letter;
