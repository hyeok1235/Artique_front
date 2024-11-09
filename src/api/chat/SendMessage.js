import React, { useState } from "react";

const SendMessage = () => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    const data = {
      message: "이 작품의 시대적 배경에 대해 설명해줘",
      picture_id: "1",
      receiver: "2",
      sender: "1",
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/chat/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("서버 응답:", result);
      } else {
        console.error("서버 요청 실패");
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <h1>메시지 보내기</h1>
      <button onClick={handleSend}>메시지 전송</button>
    </div>
  );
};

export default SendMessage;
