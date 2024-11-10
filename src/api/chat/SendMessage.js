import React, { useState } from "react";

const sendMessage = async (data) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}chat/save`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        mode: "no-cors",
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log("서버 응답:", result);
      return result; // return the result to the caller
    } else {
      console.error("서버 요청 실패");
      throw new Error("서버 요청 실패");
    }
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error; // propagate the error
  }
};

export default sendMessage;
