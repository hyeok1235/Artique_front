import React, { useState, useRef, useEffect } from "react";
import { Mic, Square, Loader2 } from "lucide-react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
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

      const response = await fetch(
        "https://naveropenapi.apigw.ntruss.com/recog/v1",
        {
          method: "POST",
          headers: {
            "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_NAVER_API_KEY_ID,
            "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NAVER_API_KEY,
          },
          body: formData,
        }
      );

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
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.type === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Recording controls */}
      <div className="border-t bg-white p-4">
        <div className="flex justify-center gap-4 max-w-4xl mx-auto">
          {isProcessing ? (
            <div className="flex items-center gap-2 text-blue-500">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>변환중...</span>
            </div>
          ) : (
            <>
              <button
                onClick={startRecording}
                disabled={isRecording}
                className={`p-4 rounded-full transition-all transform hover:scale-110 ${
                  isRecording
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 shadow-lg"
                }`}
              >
                <Mic
                  className={`w-6 h-6 ${
                    isRecording ? "text-gray-500" : "text-white"
                  }`}
                />
              </button>

              <button
                onClick={stopRecording}
                disabled={!isRecording}
                className={`p-4 rounded-full transition-all transform hover:scale-110 ${
                  !isRecording
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600 shadow-lg animate-pulse"
                }`}
              >
                <Square
                  className={`w-6 h-6 ${
                    !isRecording ? "text-gray-500" : "text-white"
                  }`}
                />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
