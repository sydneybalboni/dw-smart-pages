import React, { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import "../styles/ChatBot.css";

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([]); // Stores chat history
  const [input, setInput] = useState(""); // Stores user input
  const socketRef = useRef(null); // Reference for WebSocket connection

  // Establish WebSocket connection
  useEffect(() => {
    // Connect to FastAPI WebSocket endpoint
    socketRef.current = new WebSocket("ws://localhost:8000/ws/chat");

    // Handle incoming messages from the server
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const botMessage = { sender: "bot", text: data.response };
      setMessages((prev) => [...prev, botMessage]);
    };

    // Handle connection close
    socketRef.current.onclose = () => {
      console.error("WebSocket connection closed");
    };

    // Cleanup on component unmount
    return () => {
      socketRef.current.close();
    };
  }, []);

  // Send message to the server
  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message to the UI
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Send message through WebSocket
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({ message: input }) // Send user input to the backend
      );
    }

    // Clear input
    setInput("");
  };

  return (
    <div className="chatbot">
      <ChatHeader onClose={onClose} />
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