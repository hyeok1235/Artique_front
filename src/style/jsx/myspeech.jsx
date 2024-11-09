// speechbubble.jsx
import React from "react";
import "../myspeech.css";

const MySpeech = ({ children, direction = "left" }) => {
  return <div className={`myspeech-bubble ${direction}`}>{children}</div>;
};

export default MySpeech;
