import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountPage from "./components/AccountPage";
import LoginSignUp from "./components/LoginSignup";
import Header from "./components/Header";
import ExhibitName from "./components/ExhibitName";
import ExhibitImage from "./components/ExhibitImage";
import ControlBox from "./components/Controlbox";
import ChatBot from "./components/ChatBot";
import ChatButton from "./components/ChatButton";
import Trivia from "./components/Trivia"; // Import the Trivia component
import popup from "./assets/badges/lakes.png";
import { IoClose } from "react-icons/io5"; // Import Close icon
import "./App.css";

const MainPage = () => {
  const [level, setLevel] = useState("Beginner");
  const [language, setLanguage] = useState("en-US");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBadgesModalOpen, setBadgesModalOpen] = useState(false);
  const[hasModalShown, setHasModalShown] = useState(false);

  // Handle TTS functionality
  const handleTTSClick = (text) => {
    if (!text) {
      console.error("TTS Error: No text provided.");
      return;
    }
    try {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("TTS Error:", error);
    }
  };

  // Toggle ChatBot visibility
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  useEffect(() => {
    if (!hasModalShown) {
      // Open the modal when the component loads
      setBadgesModalOpen(true);
      setHasModalShown(true);  // Mark the modal as shown
 
      // Disable scrolling when the modal is open
      document.body.style.overflow = "hidden";

      // Clean up the scrolling style on modal close or unmount
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [hasModalShown]);  // Effect depends on hasModalShown

  const closeModal = () => {
    setBadgesModalOpen(false);
    document.body.style.overflow = "auto";  // Re-enable scrolling when modal is closed
  };

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

      {/* ChatBot */}
      {isChatOpen && <ChatBot onClose={toggleChat} />}
      {!isChatOpen && <ChatButton onClick={toggleChat} />}

      {/* Badges Modal */}
      {isBadgesModalOpen && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent overlay
              zIndex: 999,
            }}
            onClick={closeModal} // Close modal if clicking outside 
          />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)", // Centers the modal
              backgroundColor: "#ffffff",
              padding: "20px 30px",
              borderRadius: "12px",
              zIndex: 1000,
              fontFamily: "'Poppins', sans-serif",
              textAlign: "center",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            <IoClose
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "1.5rem",
                color: "#201c51",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.2)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              onClick={closeModal} // Close the modal when clicking the X
            />
            <h2
              style={{
                fontSize: "1.8rem",
                marginBottom: "20px",
                color: "#201c51",
                fontWeight: "700",
              }}
            >
              Congratulations!
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "#333333",
                marginBottom: "20px",
              }}
            >
              You have unlocked a new badge!
            </p>
            <img
              src={popup}
              alt="Unlocked Great Lakes Badge"
              style={{
                width: "150px",
                height: "150px",
                marginBottom: "20px",
                borderRadius: "8px",
              }}
            />
          </div>
        </>
      )}

      {/* Trivia Section */}
      <Trivia />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/login" element={<LoginSignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
