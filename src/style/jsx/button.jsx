import React from "react";
import { Button } from "antd";

//1. 메인버튼
export const NavigationButton = ({ onClick, children, ...props }) => (
  <div style={{ margin: "10px 0" }}>
    <Button
      type="primary"
      onClick={onClick}
      style={{
        backgroundColor: "rgba(180, 220, 530, 0.7)",
        color: "white",
        fontWeight: "bold",
        borderColor: "gray",
        border: "none",
        borderRadius: "2cap",
        margin: "10px", // 추가된 margin
        padding: "20px 30px", // 추가된 padding
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
        borderRadius: "2cap",
        fontWeight: "bold",
        backgroundColor: "rgba(173, 216, 230, 0.3)", // 더 투명한 하늘색
        color: "white", // 글자색은 회색
        border: "none",
        margin: "10px", // 추가된 margin
        padding: "10px 10px", // 추가된 padding
      }}
      {...props}
    >
      {children}
    </Button>
  </div>
);
