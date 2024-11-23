import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountPage from "./components/AccountPage";
import Header from "./components/Header";
import ExhibitName from "./components/ExhibitName";
import ExhibitImage from "./components/ExhibitImage";
import ControlBox from "./components/Controlbox";
import Exhibit from "./components/Exhibit";
import ChatBot from "./components/ChatBot";
import ChatButton from "./components/ChatButton";
import BadgesModal from './components/BadgesModal';
import "./App.css";

const MainPage = () => {
  const [level, setLevel] = useState("Beginner");
  const [language, setLanguage] = useState("en-US");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBadgesModalOpen, setBadgesModalOpen] = useState(false); //state of badges pop up

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

  useEffect(() => { 
    setBadgesModalOpen(true);
  }, []);
 
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

      {/* Badges Modal Component */}
      <BadgesModal isOpen={isBadgesModalOpen} 
      onClose={() => {
        console.log("Closing Modal");
        setBadgesModalOpen(false)
      }}>
        <h2>You have unlocked a new badge!</h2>
        <p>insert badge here.</p>
        <button onClick={() => setBadgesModalOpen(false)}>Close</button>
      </BadgesModal>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Router>
  );
};

export default App;
