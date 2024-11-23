import React from "react";
import "../styles/ChatMessage.css";

const ChatMessage = ({ message }) => {
  const isUser = message.sender === "user";
  return (
    <div className={`chat-message ${isUser ? "user" : "bot"}`}>
      {message.text}
    </div>
  );
};

export default ChatMessage;
