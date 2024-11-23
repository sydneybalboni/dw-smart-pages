import React from 'react';
import '../styles/ExhibitImage.css';
import greatLakes from '../assets/GreatLakes.jpg';  // Import the CSS for the image styling

const ExhibitImage = ({ alt }) => {
    return (
      <div className="exhibit-image-container">
        <img src={greatLakes} alt={alt} className="exhibit-image" />
      </div>
    );
  };
  
  export default ExhibitImage;