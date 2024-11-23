import React from "react";
import "../styles/ChatButton.css";

const ChatButton = ({ onClick }) => {
  return (
    <button className="chat-button" onClick={onClick}>
      💬
    </button>
  );
};

export default ChatButton;
