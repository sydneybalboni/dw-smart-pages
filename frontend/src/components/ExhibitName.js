import React from "react";
import "../styles/ExhibitName.css";

const ExhibitName = ({ name }) => {
  return (
    <div className="exhibit-name-container">
      <h1 className="exhibit-name">{name}</h1>
    </div>
  );
};

export default ExhibitName;
