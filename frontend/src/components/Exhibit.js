// src/components/Exhibit.js
import React from 'react';
import '../styles/Exhibit.css';

const Exhibit = ({ level, handleTTSClick }) => {
  const content = {
    Beginner: "This is a simple explanation of the exhibit.",
    Intermediate: "This is a more detailed explanation of the exhibit.",
    Advanced: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam faucibus orci nec lectus aliquet, sed volutpat purus condimentum. Integer pretium quam quis turpis faucibus, a maximus lorem luctus. Vivamus ut nisl ultricies, euismod neque ac, vulputate orci. Suspendisse potenti. Curabitur ut velit nec lorem viverra cursus. Pellentesque imperdiet nisl et arcu fermentum, nec euismod mi fringilla. Aliquam erat volutpat. Nulla facilisi. Sed in quam et felis suscipit vehicula. Sed placerat nisl at sapien hendrerit, sit amet ullamcorper lorem feugiat. Ut id enim eu sapien ultricies condimentum non a eros. Nulla tristique velit vitae sollicitudin blandit."
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