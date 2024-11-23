// src/App.js
import React, { useState } from 'react';
import ControlBox from './components/Controlbox';
import Exhibit from './components/Exhibit';
import Header from './components/Header'; // Make sure Header is imported
import './App.css';

const App = () => {
  const [level, setLevel] = useState('Beginner');
  const [language, setLanguage] = useState('en-US');

  const handleLevelChange = (level) => {
    setLevel(level);  // Update the level based on the slider or user selection
  };

  const handleTextToSpeech = (paragraphId) => {
    const text = document.getElementById(paragraphId).textContent;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    speechSynthesis.speak(utterance);  // Read the selected text aloud
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);  // Update the language for TTS
  };

  return (
    <div className="App">
      {/* Render the Header */}
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
