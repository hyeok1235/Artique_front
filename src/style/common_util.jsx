import React from "react";
import { Button } from "antd";

//1. 메인버튼
export const NavigationButton = ({ onClick, children, ...props }) => (
  <div style={{ margin: "10px 0" }}>
    <Button
      type="primary"
      onClick={onClick}
      style={{
        backgroundColor: "rgba(173, 216, 230, 0.5)",
        color: "gray",
        borderColor: "gray",
        border: "none",
      }}
      {...props}
    >
      {children}
    </Button>
  </div>
);

//2.내용 넣는 버튼
export const ContentButton = ({ onClick, children, ...props }) => (
  <div style={{ margin: "10px 0" }}>
    <Button
      onClick={onClick}
      style={{
        backgroundColor: "rgba(173, 216, 230, 0.1)", // 더 투명한 하늘색
        color: "gray", // 글자색은 회색
        border: "1px solid white", // 테두리 제거
      }}
      {...props}
    >
      {children}
    </Button>
  </div>
);
