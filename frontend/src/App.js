import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountPage from "./components/AccountPage";
import Header from "./components/Header"; // Header with logo and account icon
import ExhibitName from "./components/ExhibitName"; // New component for the exhibit name
import ExhibitImage from "./components/ExhibitImage"; // ExhibitImage with exhibit name overlay
import ControlBox from "./components/Controlbox"; // ControlBox import
import ChatBot from "./components/ChatBot"; // ChatBot component
import ChatButton from "./components/ChatButton"; // Floating chat button
import "./App.css";

const MainPage = () => {
  const [level, setLevel] = useState("Beginner");
  const [language, setLanguage] = useState("en-US");
  const [isChatOpen, setIsChatOpen] = useState(false); // State to manage chatbot visibility

  const handleLevelChange = (level) => {
    setLevel(level);
  };

  const handleTextToSpeech = (paragraphId) => {
    const text = document.getElementById(paragraphId).textContent;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    speechSynthesis.speak(utterance); // Read the selected text aloud
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
      {/* Render Header */}
      <Header />

      {/* Render Exhibit Name */}
      <ExhibitName name="Exhibit Name" />

      {/* Display the Exhibit Image */}
      <ExhibitImage 
        src="/assets/GreatLakes.jpg" 
        alt="Exhibit Display" 
      />

      {/* Render Control Box */}
      <ControlBox
        onChangeLevel={handleLevelChange}
        onTextToSpeech={handleTextToSpeech}
        onLanguageSelect={handleLanguageChange}
      />

      {/* Conditionally render the ChatBot */}
      {isChatOpen && <ChatBot onClose={toggleChat} />}

      {/* Floating Chat Button */}
      {!isChatOpen && <ChatButton onClick={toggleChat} />}
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
