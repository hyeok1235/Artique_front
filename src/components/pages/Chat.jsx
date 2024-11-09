import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VoiceChatInterface = () => {
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
    addMessage("user", "음성 메시지 변환 중...");

    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.wav");

      const response = await fetch("YOUR_NAVER_STT_API_ENDPOINT", {
        method: "POST",
        headers: {
          "X-NCP-APIGW-API-KEY-ID": "YOUR_API_KEY_ID",
          "X-NCP-APIGW-API-KEY": "YOUR_API_KEY",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("STT API 호출 실패");
      }

      const data = await response.json();
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          type: "user",
          content: data.text,
          timestamp: new Date(),
        };
        return newMessages;
      });
    } catch (error) {
      console.error("STT 처리 실패:", error);
      addMessage("system", "음성 인식에 실패했습니다.");
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
    <div className="chat-container">
      <div className="header">
        <button
          className="exit-button"
          onClick={() => navigate("/userview/letter")}
        >
          대화 종료하기
        </button>
      </div>

      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-content">
              <p>{message.content}</p>
              <span className="timestamp">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
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

      <style jsx>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color: #f5f5f5;
        }

        .header {
          background-color: white;
          padding: 16px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: flex-end;
        }

        .exit-button {
          background-color: #ff3b30;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s ease;
        }

        .exit-button:hover {
          background-color: #d63024;
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message {
          display: flex;
          margin-bottom: 10px;
        }

        .message.user {
          justify-content: flex-end;
        }

        .message-content {
          max-width: 70%;
          padding: 12px;
          border-radius: 12px;
          position: relative;
        }

        .message.user .message-content {
          background-color: #007aff;
          color: white;
        }

        .message.system .message-content {
          background-color: white;
          color: #333;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .timestamp {
          font-size: 0.75rem;
          opacity: 0.7;
          margin-top: 4px;
          display: block;
        }

        .controls-container {
          background-color: white;
          padding: 20px;
          border-top: 1px solid #eee;
        }

        .button-container {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .record-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .record-button svg {
          width: 24px;
          height: 24px;
          fill: white;
        }

        .record-button.start {
          background-color: #007aff;
        }

        .record-button.stop {
          background-color: #ff3b30;
        }

        .record-button.disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .record-button:not(.disabled):hover {
          transform: scale(1.1);
        }

        .record-button.start:not(.disabled):hover {
          background-color: #0066cc;
        }

        .record-button.stop:not(.disabled):hover {
          background-color: #d63024;
        }

        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #007aff;
        }

        .loading-spinner {
          width: 24px;
          height: 24px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #007aff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .record-button.stop.active {
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default VoiceChatInterface;
