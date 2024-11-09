import React, { useEffect, useState } from "react";

const Letter = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const createImageWithText = async () => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // CORS 이슈를 방지하려면 이미지가 CORS를 허용해야 합니다.
      img.src =
        "https://artique-bucket.s3.ap-northeast-2.amazonaws.com/pictures/b34c3722b18d48bd87e66c9686caec25.png"; // 이미지 URL

      img.onload = () => {
        // 이미지 로드가 완료되었을 때
        setImageSrc(img.src); // 이미지를 직접 렌더링할 수 있도록 상태 업데이트
        console.log(imageSrc);

        // 캔버스에서 텍스트와 이미지를 결합할 필요 없이 QR 코드만 생성하기
        const imageWithTextURL = img.src; // 임시로 이미지를 QR 코드에 사용
        const googleChartAPI = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(
          imageWithTextURL
        )}`;
        setQrCodeUrl(googleChartAPI); // QR 코드 URL 설정
      };

      img.onerror = () => {
        console.error("이미지 로드 실패");
      };
    };

    createImageWithText();
  }, []);

  return (
    <div>
      <h1>Letter</h1>
      {/* 이미지 직접 렌더링 */}
      {imageSrc && (
        <img src={imageSrc} alt="Loaded" style={{ width: "500px" }} />
      )}

      {/* QR 코드 이미지 */}
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
    </div>
  );
};

export default Letter;
