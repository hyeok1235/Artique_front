import React, { useEffect, useState } from "react";

const Letter = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [canvasUrl, setCanvasUrl] = useState("");

  const textOptions = [
    "텍스트 1",
    "텍스트 2",
    "텍스트 3",
    "텍스트 4",
    "텍스트 5",
  ];

  useEffect(() => {
    const createImageWithText = async () => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // CORS 이슈를 방지하려면 이미지가 CORS를 허용해야 합니다.
      img.src =
        "https://cors-anywhere.herokuapp.com/https://artique-bucket.s3.ap-northeast-2.amazonaws.com/pictures/b34c3722b18d48bd87e66c9686caec25.png"; // 이미지 URL

      img.onload = () => {
        setImageSrc(img.src); // 이미지를 직접 렌더링할 수 있도록 상태 업데이트

        // 텍스트 추가하기
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        // 선택한 텍스트를 캔버스에 추가
        ctx.font = "30px Arial";
        ctx.fillStyle = "white"; // 텍스트 색상
        ctx.fillText(selectedText, 50, 50); // 텍스트 위치 (x, y)

        // 텍스트가 추가된 이미지를 데이터 URL로 변환
        const dataUrl = canvas.toDataURL();
        setCanvasUrl(dataUrl); // 이 데이터를 QR 코드 생성에 사용
        
        // TODO: QR 코드 생성 로직 추가
        // dataUrl을 백엔드로 전송하여 이미지 url을 받아오기
        // 그 이미지 url을 QR 코드로 생성

        // QR 코드 생성
        const googleChartAPI = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          dataUrl
        )}&size=200x200`;
        setQrCodeUrl(googleChartAPI); // QR 코드 URL 설정
      };

      img.onerror = () => {
        console.error("이미지 로드 실패");
      };
    };

    createImageWithText();
  }, [selectedText]); // selectedText가 변경될 때마다 실행

  return (
    <div>
      <h1>Letter</h1>

      {/* 텍스트 선택 버튼 */}
      <div>
        {textOptions.map((text, index) => (
          <button key={index} onClick={() => setSelectedText(text)}>
            {text}
          </button>
        ))}
      </div>

      {/* 이미지 직접 렌더링 */}
      {imageSrc && (
        <img src={imageSrc} alt="Loaded" style={{ width: "500px" }} />
      )}

      {/* 텍스트가 추가된 이미지 */}
      {canvasUrl && (
        <div>
          <h2>Text Added Image</h2>
          <img
            src={canvasUrl}
            alt="Image with text"
            style={{ width: "500px" }}
          />
        </div>
      )}

      {/* QR 코드 이미지 */}
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
    </div>
  );
};

export default Letter;
