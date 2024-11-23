// src/components/Header.js
import React, { useState } from 'react';
import '../styles/Header.css';
import discoveryWorldLogo from '../assets/Discovery-World.svg';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img
          src={discoveryWorldLogo}  // Correct path for assets in public folder
          alt="Exhibit Logo"
          className="logo"
        />
      </div>
      

      {/* User Icon and Dropdown */}
      <div className="user-profile">
        <FaUserCircle
          className="user-icon"
          onClick={toggleDropdown} // Toggle dropdown when clicked
        />
        {isDropdownVisible && (
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