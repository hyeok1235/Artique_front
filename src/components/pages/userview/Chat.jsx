import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpeechBubble from "../../../style/speechbubble";
import MySpeech from "../../../style/myspeech";
import { NavigationButton } from "../../../style/buttom";
import "../../../style/background_picture.css";
import "../../../style/Chat.css";
import sendMessage from "../../../api/chat/SendMessage";

// TypeWriter 컴포넌트 추가
const TypeWriter = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 100); // 타이핑 속도 조절 (50ms)

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <p>{displayText}</p>;
};

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      type: "system",
      content: "안녕하세요, 만나서 반가워요!",
      timestamp: new Date(),
      isTyping: true,
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // OpenAI TTS API 호출 함수
  const generateSpeech = async (text) => {
    try {
      const response = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "tts-1",
          input: text,
          voice: "alloy",
        }),
      });

      if (!response.ok) throw new Error("TTS 생성 실패");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // 오디오 재생
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.play();
    } catch (error) {
      console.error("TTS 생성 중 오류:", error);
    }
  };

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

      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          content: user_data.text,
          timestamp: new Date(),
          isTyping: false,
        },
      ]);

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
          isTyping: true,
        },
      ]);

      generateSpeech(result.message);
    } catch (error) {
      console.error("STT 처리 실패:", error);
      addMessage("system", "다시 한번 말해주시겠어요?");
    } finally {
      setIsProcessing(false);
    }
  };

  const addMessage = (type, content) => {
    const newMessage = {
      type,
      content,
      timestamp: new Date(),
      isTyping: type === "system",
    };

    setMessages((prev) => [...prev, newMessage]);

    if (type === "system") {
      generateSpeech(content);
    }
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
                {message.isTyping ? (
                  <TypeWriter
                    text={message.content}
                    onComplete={() => {
                      const updatedMessages = [...messages];
                      updatedMessages[index].isTyping = false;
                      setMessages(updatedMessages);
                    }}
                  />
                ) : (
                  <p>{message.content}</p>
                )}
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
