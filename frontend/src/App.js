// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';  // Ensure Header is imported
import ControlBox from './components/Controlbox';  // ControlBox import
import Exhibit from './components/Exhibit';  // Exhibit import
import './App.css';

const App = () => {
  const [level, setLevel] = useState('Beginner');
  const [language, setLanguage] = useState('en-US');
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

  return (
    <div className="App">
      {/* Ensure the Header is rendered properly */}
      <Header />
      {/* Render the Control Box */}
      <ControlBox
        onChangeLevel={handleLevelChange}
        onTextToSpeech={handleTextToSpeech}
        onLanguageSelect={handleLanguageChange}
      />
      {/* Render the Exhibit based on selected level */}
      {/* <Exhibit level={level} /> */}
    </div>
  );
};

export default App;
