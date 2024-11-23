// src/components/Exhibit.js
import React from 'react';
import '../styles/Exhibit.css';

const Exhibit = ({ level, handleTTSClick }) => {
  const content = {
    Beginner: "This is a simple explanation of the exhibit.",
    Intermediate: "This is a more detailed explanation of the exhibit.",
    Advanced: "This is a complex, in-depth analysis of the exhibit, intended for advanced learners."
  };

  return (
    <div className="exhibit">
      {/* Only one box for both paragraphs */}
      <div className="section prasent">
        <h2>Prasent</h2>
        <div 
          id="prasent" 
          className="paragraph-box" 
          onClick={() => handleTTSClick(content[level])} // Trigger TTS when clicked
        >
          {content[level]}
        </div>
      </div>
      <div className="section ipsum">
        <h2>Ipsum</h2>
        <div 
          id="ipsum" 
          className="paragraph-box" 
          onClick={() => handleTTSClick(content[level])} // Trigger TTS when clicked
        >
          {content[level]}
        </div>
      </div>
    </div>
  );
};

export default Exhibit;