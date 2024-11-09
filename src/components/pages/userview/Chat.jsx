import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpeechBubble from "../../../style/speechbubble";
import MySpeech from "../../../style/myspeech";
import { NavigationButton } from "../../../style/buttom";
import "../../../style/background_picture.css";
import "../../../style/Chat.css";
import sendMessage from "../../../api/chat/SendMessage";

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      type: "system",
      content: "안녕하세요, 만나서 반가워요!",
      timestamp: new Date(),
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("음성 녹음 시작 실패:", error);
      addMessage("system", "음성 녹음을 시작할 수 없습니다.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" });
        await sendToNaverSTT(audioBlob);

        const tracks = mediaRecorderRef.current.stream.getTracks();
        tracks.forEach((track) => track.stop());
      };

      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendToNaverSTT = async (audioBlob) => {
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.wav");

      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=Kor",
        {
          method: "POST",
          headers: {
            "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_NAVER_API_KEY_ID,
            "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NAVER_API_KEY,
            "Content-Type": "application/octet-stream",
          },
          body: audioBlob,
        }
      );

      if (!response.ok) {
        throw new Error("STT API 호출 실패");
      }

      const user_data = await response.json();

      // 음성 변환 성공 시 텍스트를 메시지로 추가
      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          content: user_data.text,
          timestamp: new Date(),
        },
      ]);

      // 메시지 전송
      const query = {
        message: user_data.text,
        picture_id: "1",
        receiver: "2",
        sender: "1",
      };

      const result = await sendMessage(query);
      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          content: result.message,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("STT 처리 실패:", error);
      // 음성 인식 실패 시 시스템 메시지 추가
      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          content: "다시 한번 말해주시겠어요?",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const addMessage = (type, content) => {
    setMessages((prev) => [
      ...prev,
      {
        type,
        content,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="chat-container start-page">
      <div className="header">
        <NavigationButton
          className="exit-button"
          onClick={() => navigate("/userview/letter")}
        >
          대화 종료하기
        </NavigationButton>
      </div>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.type === "system" ? (
              <SpeechBubble
                className="message-content"
                direction="left"
                style={{ backgroundColor: "white" }}
              >
                <p>{message.content}</p>
                <span className="timestamp">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </SpeechBubble>
            ) : (
              <MySpeech
                className="message-content"
                direction="right"
                style={{ backgroundColor: "blue" }}
              >
                <p>{message.content}</p>
                <span className="timestamp">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </MySpeech>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="controls-container">
        {isProcessing ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <span>변환중...</span>
          </div>
        ) : (
          <div className="button-container">
            <button
              onClick={startRecording}
              disabled={isRecording}
              className={`record-button start ${isRecording ? "disabled" : ""}`}
            >
              <svg viewBox="0 0 24 24" className="mic-icon">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            </button>
            <button
              onClick={stopRecording}
              disabled={!isRecording}
              className={`record-button stop ${!isRecording ? "disabled" : ""}`}
            >
              <svg viewBox="0 0 24 24" className="stop-icon">
                <rect x="6" y="6" width="12" height="12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
