import React, { useState, useEffect } from "react";
import "../styles/Exhibit.css";
import { FaPlay } from "react-icons/fa"; // Import a play icon

const Exhibit = ({ level, language, handleTTSClick }) => {
  const [description, setDescription] = useState("Loading description...");

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
        setDescription(data.description); // Set the description string from the backend
      } catch (error) {
        console.error("Error fetching description:", error);
        setDescription("Unable to load description. Please try again later.");
      }
    };

    fetchDescription();
  }, [level, language]);

  return (
    <div className="exhibit">
      {/* Prasent Section */}
      <div className="section prasent">
        <div className="header-row">
          <h2>Prasent</h2>
          {/* Play button aligned with the paragraph box */}
          <div
            className="play-button"
            onClick={() => handleTTSClick(description)} // Trigger TTS for Prasent
            role="button"
            aria-label="Play Prasent Description"
          >
            <FaPlay className="play-icon" />
          </div>
        </div>
        {/* Paragraph box */}
        <div
          id="prasent"
          className="paragraph-box"
          onClick={() => handleTTSClick(description)} // Trigger TTS when clicking the box
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default Exhibit;
