import React from "react";

export default function Footer() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",

        color: "white", // 글씨색 (선택 사항)
        padding: "10px 0", // 위아래 여백
      }}
    >
      <p>Copyright &copy;inthon_team5</p>
    </div>
  );
}
