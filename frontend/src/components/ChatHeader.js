import React from "react";
import "../styles/ChatHeader.css";

const ChatHeader = ({ onClose }) => {
  return (
    <div className="chat-header">
      <span>ChatBot</span>
      <button onClick={onClose} className="close-button">✖</button>
    </div>
  );
};

export default ChatHeader;
