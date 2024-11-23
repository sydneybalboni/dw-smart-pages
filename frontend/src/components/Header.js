import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


import "../styles/Header.css";
import discoveryWorldLogo from "../assets/Discovery-World.svg";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
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

  return (
    <header className="header">
      <div className="logo-container">
        <img
          src={discoveryWorldLogo}
          alt="Discovery World Logo"
          className="logo"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="user-profile" ref={dropdownRef}>
        <FaUserCircle
          className="user-icon"
          onClick={toggleDropdown}
          // aria-expanded={isDropdownVisible} // Accessibility support
        />
        {isDropdownVisible && (
          <div className="dropdown-menu">
          <button onClick={() => navigate("/account")}>Account</button>
          <button onClick={() => alert('Go to Badge Page')}>Badge</button>
          <button onClick={() => alert('Sign Out')}>Sign Out</button>
        </div>
        )}
      </div>
    </header>
  );
};

export default Header;
