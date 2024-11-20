// style/film.jsx
import React from "react";

const FilmContainer = ({ children }) => {
  return (
    <div style={containerStyle}>
      <div style={filmStripStyle}>
        {filmHolesTop}
        <div style={filmContentStyle}>{children}</div>
        {filmHolesBottom}
      </div>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
};

const filmStripStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "rgba(54, 44, 44, 0.9)",
  padding: "20px 0",
  borderRadius: "0px",
  position: "relative",
  //   overflow: "hidden",
  width: "fit-content",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
};

const filmContentStyle = {
  position: "relative",
  width: "400px",
  height: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(58, 58, 58, 0.2)",
  padding: "15px",
  overflow: "hidden",
};

// 필름 홀 스타일 (상단, 하단)
const filmHoleStyle = {
  width: "10px",
  height: "7px",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  borderRadius: "15%",
  margin: "0 5px",
};

const filmHolesTop = (
  <div
    style={{
      display: "flex",
      position: "absolute",
      top: "7px",
      left: "0px",
      right: "0px",
      justifyContent: "space-around",
    }}
  >
    {Array.from({ length: 15 }).map((_, i) => (
      <div key={`top-${i}`} style={filmHoleStyle} />
    ))}
  </div>
);

const filmHolesBottom = (
  <div
    style={{
      display: "flex",
      position: "absolute",
      bottom: "7px",
      left: "0px",
      right: "0px",
      justifyContent: "space-around",
    }}
  >
    {Array.from({ length: 15 }).map((_, i) => (
      <div key={`bottom-${i}`} style={filmHoleStyle} />
    ))}
  </div>
);

export default FilmContainer;
