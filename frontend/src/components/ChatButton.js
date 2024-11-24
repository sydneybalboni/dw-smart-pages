import React from "react";
import "../styles/ChatButton.css";
import icon from "../assets/chatbotdw-icon.png"; // Import your icon


const ChatButton = ({ onClick }) => {
  return (
    <img
      src={icon}
      alt="Chatbot Icon"
      className="chat-button-icon"
      onClick={onClick}
    />
  );
};

export default ChatButton;
