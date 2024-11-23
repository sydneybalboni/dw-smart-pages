import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountPage from "./components/AccountPage";
import LoginSignUp from "./components/LoginSignup";
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
      onClose={() => setBadgesModalOpen(false)}>
        <h2>You have unlocked a new badge!</h2>
        <img 
          src="/badges/GreatLakesBadge.png"
          alt="Unlocked Great Lakes Badge"
          style={{ 
            width: "150px",
            height: "150px",
            display: "bock",
            margin: "0 auto 20px auto"
          }}
        />
        <button 
        onClick={() => setBadgesModalOpen(false)}
          style={{
            fontSize: "1.5rem",   // Make the font size larger
            padding: "10px 20px", // Increase the padding for a bigger button
            cursor: "pointer",    // Change cursor to pointer
            backgroundColor: "#201c51", // Button background color (optional)
            color: "white",       // Button text color (optional)
            border: "none",       // Remove default border
            borderRadius: "5px",  // Rounded corners
            marginTop: "20px"     // Add space between the image and button
          }}
        >
          Close  
        </button>
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
        <Route path ="/login" element={<LoginSignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
