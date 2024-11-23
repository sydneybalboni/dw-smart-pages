import React, { useState } from "react";
import "../styles/ChatBot.css";
import ChatMessage from "./ChatMessage";

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    // Simulate bot response for demo
    setTimeout(() => {
      const botMessage = { sender: "bot", text: "I received your message!" };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="chatbot">
      <div className="chat-header">
        ChatBot
        <button className="chat-header-close" onClick={onClose}>
          ✖
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
