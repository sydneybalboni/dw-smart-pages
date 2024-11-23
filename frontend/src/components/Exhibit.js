import React, { useState, useEffect } from "react";
import "../styles/Exhibit.css";

const Exhibit = ({ level, language, handleTTSClick }) => {
  const [description, setDescription] = useState("Loading description...");

  // Fetch the description on component mount or when level/language changes
  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/generate_description", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ level, language, exhibit: "default_exhibit" }), // Pass exhibit name
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
  }, [level, language]); // Fetches description on level or language change

  return (
    <div className="exhibit">
      <div className="section prasent">
        <h2>Prasent</h2>
        <div
          id="prasent"
          className="paragraph-box"
          onClick={() => handleTTSClick(description)} // Trigger TTS when clicked
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default Exhibit;
