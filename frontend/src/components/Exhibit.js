import React, { useState, useEffect } from "react";
import "../styles/Exhibit.css";
import { FaPlay, FaPause } from "react-icons/fa"; // Import both play and pause icons

const Exhibit = ({ level, language, handleTTSClick }) => {
  const [description, setDescription] = useState("Loading description...");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Fetch the description whenever the level or language changes
  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/generate_description", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ level, language, exhibit: "default_exhibit" }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch description");
        }
    
        const data = await response.json();
        setDescription(data.description);
      } catch (error) {
        console.error("Error fetching description:", error);
        setDescription("Unable to load description. Please try again later.");
      }
    };

    fetchDescription();

    // Cleanup function to stop speaking and reset state when component unmounts
    return () => {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    };
  }, [level, language]);

  // Modified TTS handler that manages speaking state
  const handleTTSWithState = (text) => {
    const synth = window.speechSynthesis;
    
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synth.speak(utterance);
  };

  return (
    <div className="exhibit">
      {/* Prasent Section */}
      <div className="section prasent">
        <div className="header-row">
          <h2>Prasent</h2>
          {/* Play/Pause button with dynamic icon */}
          <div
            className="play-button"
            onClick={() => handleTTSWithState(description)}
            role="button"
            aria-label={isSpeaking ? "Pause Prasent Description" : "Play Prasent Description"}
          >
            {isSpeaking ? (
              <FaPause className="play-icon" />
            ) : (
              <FaPlay className="play-icon" />
            )}
          </div>
        </div>
        {/* Paragraph box */}
        <div
          id="prasent"
          className="paragraph-box"
          onClick={() => handleTTSWithState(description)}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default Exhibit;