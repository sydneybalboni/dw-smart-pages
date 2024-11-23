import React, { useState } from "react";
import Header from "./components/Header";
import ExhibitName from "./components/ExhibitName";
import ExhibitImage from "./components/ExhibitImage";
import ControlBox from "./components/Controlbox";
import Exhibit from "./components/Exhibit";
import ChatBot from "./components/ChatBot";
import ChatButton from "./components/ChatButton";
import "./App.css";

const App = () => {
  const [level, setLevel] = useState("Beginner");
  const [language, setLanguage] = useState("en-US");
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Handle TTS functionality
  const handleTTSClick = (text) => {
    if (!text) {
      console.error("TTS Error: No text provided.");
      return;
    }
    try {
      speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language; // Set the current language
      speechSynthesis.speak(utterance); // Trigger TTS
    } catch (error) {
      console.error("TTS Error:", error);
    }
  };

  // Toggle ChatBot visibility
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <div className="App">
      {/* Header */}
      <Header />

      {/* Exhibit Name */}
      <ExhibitName name="GREAT LAKES FUTURE" />

      {/* Exhibit Image */}
      <ExhibitImage src="/assets/GreatLakes.jpg" alt="Exhibit Display" />

      {/* Control Box */}
      <ControlBox
        onChangeLevel={(newLevel) => setLevel(newLevel)}
        onLanguageSelect={(newLanguage) => setLanguage(newLanguage)}
        language={language}
        level={level}
        handleTTSClick={handleTTSClick}
      />

      {/* Exhibit
      <Exhibit
        level={level}
        language={language}
        handleTTSClick={handleTTSClick}
      /> */}

      {/* ChatBot */}
      {isChatOpen && <ChatBot onClose={toggleChat} />}
      {!isChatOpen && <ChatButton onClick={toggleChat} />}
    </div>
  );
};

export default App;
