// speechbubble.jsx
import React from "react";
import "../speechbubble.css";

const SpeechBubble = ({ children, direction = "left" }) => {
  return <div className={`speech-bubble ${direction}`}>{children}</div>;
};

export default SpeechBubble;
