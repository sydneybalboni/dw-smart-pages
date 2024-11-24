import React, { useState, useEffect, useRef } from "react";
import "../styles/ChatBot.css";
import botIcon from "../assets/chatbotdw.png";

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8000/ws/chat");

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const botMessage = { sender: "bot", text: data.response };
      setMessages((prev) => [...prev, botMessage]);
    };

    socketRef.current.onerror = (error) => console.error("WebSocket error:", error);
    socketRef.current.onclose = () => console.log("WebSocket closed");

    return () => socketRef.current?.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message: input }));
    } else {
      console.error("WebSocket is not open");
    }

    setInput(""); // Clear the input field
  };

  return (
    <div className="chatbot">
      <div className="chat-header">
        DiscoverBot
        <button className="chat-header-close" onClick={onClose}>
          ✖
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Little Robot Icon */}
      <div className="bot-icon-container">
        <img src={botIcon} alt="Robot Icon" className="bot-icon" />
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
