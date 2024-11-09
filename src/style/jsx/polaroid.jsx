// style/polaroid.jsx
import React from "react";

const Polaroid = ({ src, caption }) => {
  // 오늘 날짜 가져오기
  const today = new Date().toLocaleDateString();

  return (
    <div style={polaroidStyle}>
      <div style={imageContainerStyle}>
        <img src={src} alt="Polaroid" style={imageStyle} />
      </div>
      <div style={captionStyle}>{caption || today}</div>
    </div>
  );
};

const polaroidStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
  padding: "10px",
  width: "300px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  borderRadius: "3px",
  margin: "20px",
};

const imageContainerStyle = {
  width: "100%",
  height: "250px",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "black",
  borderRadius: "3px",
};

const imageStyle = {
  width: "100%",
  height: "auto",
  objectFit: "cover",
};

const captionStyle = {
  marginTop: "10px",
  fontSize: "18px",
  color: "#333",
  textAlign: "center",
  fontFamily: "Pretendard",
  textShadow: "none",
};

export default Polaroid;
