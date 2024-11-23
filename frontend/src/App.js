// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';  // Ensure Header is imported
import ControlBox from './components/Controlbox';  // ControlBox import
import Exhibit from './components/Exhibit';  // Exhibit import
import ExhibitImage from './components/ExhibitImage'; // This path depends on your project structure
import ChatBot from "./components/ChatBot";
import ChatButton from "./components/ChatButton";

import './App.css';

const App = () => {
  const [level, setLevel] = useState('Beginner');
  const [language, setLanguage] = useState('en-US');
  const [isChatOpen, setIsChatOpen] = useState(false); // State to manage chatbot visibility

  const handleLevelChange = (level) => {
    setLevel(level);
  };

  const handleTextToSpeech = (paragraphId) => {
    const text = document.getElementById(paragraphId).textContent;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    speechSynthesis.speak(utterance);  // Read the selected text aloud
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  // Toggle ChatBot visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="App">
      {/* Ensure the Header is rendered properly */}
      <Header />
      
      {/* Display the Exhibit Image */}
      <ExhibitImage src="/assets/GreatLakes.jpg" alt="Exhibit Display" />
      
      {/* Render the Control Box */}
      <ControlBox
        onChangeLevel={handleLevelChange}
        onTextToSpeech={handleTextToSpeech}
        onLanguageSelect={handleLanguageChange}
      />

      {/* Render the Exhibit based on selected level */}
      {/* <Exhibit level={level} /> */}

      {/* Conditionally render the ChatBot */}
      {isChatOpen && <ChatBot onClose={toggleChat} />}

      {/* Floating Chat Button */}
      <ChatButton onClick={toggleChat} />
    </div>
  );
};

export default App;