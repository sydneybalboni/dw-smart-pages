import React, { useState } from 'react';
import Header from './components/Header'; // Header with logo and account icon
import ControlBox from './components/Controlbox'; // ControlBox import
import ExhibitImage from './components/ExhibitImage'; // ExhibitImage with exhibit name overlay
import ChatBot from "./components/ChatBot"; // ChatBot component
import ChatButton from "./components/ChatButton"; // Floating chat button
import Trivia from "./components/Trivia"; // Import the Trivia component
import './App.css';

const App = () => {
  const [level, setLevel] = useState('Beginner');
  const [language, setLanguage] = useState('en-US');
  const [isChatOpen, setIsChatOpen] = useState(false); // State to manage chatbot visibility
  const [showTrivia, setShowTrivia] = useState(false); // State for Trivia


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

      {/* Display the Exhibit Image */}
      <ExhibitImage 
        src="/assets/GreatLakes.jpg" 
        alt="Exhibit Display" 
        exhibitName="Great Lakes" 
      />

      {/* Render Control Box */}
      <ControlBox
        onChangeLevel={handleLevelChange}
        onTextToSpeech={handleTextToSpeech}
        onLanguageSelect={handleLanguageChange}
      />

      {/* Conditionally render the ChatBot */}
      {isChatOpen && (
        <ChatBot 
          onClose={toggleChat} 
          isFullScreen={window.innerWidth <= 768} // Detect mobile screen
        />
      )}

      {/* Floating Chat Button */}
      {!isChatOpen && <ChatButton onClick={toggleChat} />}

      {/* Trivia Section - Added Trivia here */}
      <Trivia /> {/* Trivia component rendered directly */}
    </div>
  );
};

export default App;
