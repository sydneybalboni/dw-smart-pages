// BadgesModal.js
import React from "react";
import "../styles/BadgesModal.css"; // Add styles for the modal

const BadgesModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Do not render if the modal is not open

  return (
    <div className="badges-modal-overlay" onClick={onClose}>
      <div className="badges-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default BadgesModal;
