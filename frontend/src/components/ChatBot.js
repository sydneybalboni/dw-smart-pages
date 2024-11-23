import React, { useState, useEffect, useRef } from "react";
import "../styles/ChatBot.css";
import ChatMessage from "./ChatMessage";

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null); // WebSocket reference

  // Establish WebSocket connection when the component mounts
  useEffect(() => {
    // Connect to the backend WebSocket
    socketRef.current = new WebSocket("ws://localhost:8000/ws/chat");

    // Handle incoming messages
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data); // Parse the JSON response
      const botMessage = { sender: "bot", text: data.response };
      setMessages((prev) => [...prev, botMessage]);
    };

    // Handle WebSocket errors
    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Handle WebSocket closure
    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup WebSocket connection on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Send the message to the backend WebSocket
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message: input })); // Send as JSON
    } else {
      console.error("WebSocket is not open");
    }

    setInput(""); // Clear the input field
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