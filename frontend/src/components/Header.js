// src/components/Header.js
import React, { useState } from 'react';
import '../styles/Header.css';
import discoveryWorldLogo from '../assets/Discovery-World.svg';
import { FaUserCircle } from 'react-icons/fa';
import { TbHexagonPlusFilled } from "react-icons/tb";

const Header = () => {
  // Track the currently open dropdown
  const [openDropdown, setOpenDropdown] = useState(null);

  // Function to toggle the account dropdown
  const toggleDropdown = (dropdown) => {
    // If the clicked dropdown is already open, close it; otherwise, open it
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

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

      {/* Badge Icon and Dropdown */}
      <div className="badges-button">
        <TbHexagonPlusFilled
          className="badges-icon"
          onClick={() => toggleDropdown('badges')}
        />
        {openDropdown === 'badges' && (
          <div className="badges-dropdown">
            {/* Add badges here */}
          </div>
        )}
      </div>

      {/* User Icon and Dropdown */}
      <div className="user-profile">
        <FaUserCircle
          className="user-icon"
          onClick={() => toggleDropdown('account')} // Toggle dropdown when clicked
        />
        {openDropdown === 'account' && (
          <div className="dropdown-menu">
            <button onClick={() => alert('View Account Info')}>Account</button>
            <button onClick={() => alert('Go to Badge Page')}>Badges</button>
            <button onClick={() => alert('Sign Out')}>Sign Out</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
