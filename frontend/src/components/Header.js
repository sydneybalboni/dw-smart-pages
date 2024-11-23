// src/components/Header.js
import React from 'react';
import '../styles/Header.css';
import discoveryWorldLogo from '../assets/discoveryworldlogo.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img
          src={discoveryWorldLogo} // Correct path for assets in public folder
          alt="Exhibit Logo"
          className="logo"
        />
      </div>
      <h1 className="exhibit-name">EXHIBIT NAME</h1>
    </header>
  );
};

export default Header;