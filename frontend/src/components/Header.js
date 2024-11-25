<<<<<<< HEAD
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
=======
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";


import "../styles/Header.css";
import discoveryWorldLogo from "../assets/Discovery-World.svg";
import { FaUserCircle } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
>>>>>>> 3c5bf92ae5f434bf88e99fd56b72a38e43ce3734
  };

  // Close the dropdown when clicking outside
  // const handleClickOutside = (event) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     setIsDropdownVisible(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const goToPage = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img
<<<<<<< HEAD
          src={discoveryWorldLogo} // Correct path for assets in public folder
          alt="Exhibit Logo"
=======
          src={discoveryWorldLogo}
          alt="Discovery World Logo"
>>>>>>> 3c5bf92ae5f434bf88e99fd56b72a38e43ce3734
          className="logo"
          onClick={() => goToPage("/")}
        />
      </div>
      <h1 className="exhibit-name">EXHIBIT NAME</h1>

      {/* Badge Icon and Dropdown */}
      <div className="badges-button">
<<<<<<< HEAD
        <TbHexagonPlusFilled
=======
        <IoAddCircle
>>>>>>> 3c5bf92ae5f434bf88e99fd56b72a38e43ce3734
          className="badges-icon"
          onClick={() => toggleDropdown('badges')}
        />
        {openDropdown === 'badges' && (
          <div className="badges-dropdown">
            {/* Add badges here */}
          </div>
        )}
      </div>

<<<<<<< HEAD
      {/* User Icon and Dropdown */}
      <div className="user-profile">
        <FaUserCircle
          className="user-icon"
          onClick={() => toggleDropdown('account')} // Toggle dropdown when clicked
=======
      <div className="user-profile" ref={dropdownRef}>
        <FaUserCircle
          className="user-icon"
          onClick={toggleDropdown}
          // aria-expanded={isDropdownVisible} // Accessibility support
>>>>>>> 3c5bf92ae5f434bf88e99fd56b72a38e43ce3734
        />
        {openDropdown === 'account' && (
          <div className="dropdown-menu">
          <button onClick={() => goToPage("/account")}>Account</button>
          <button onClick={() => alert('Go to Badge Page')}>Badge</button>
          <button onClick={() => alert('Sign Out')}>Sign Out</button>
        </div>
        )}
      </div>
    </header>
  );
};

export default Header;
