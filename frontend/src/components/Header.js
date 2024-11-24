import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../styles/Header.css";
import discoveryWorldLogo from "../assets/Discovery-World.svg";
import { FaBars } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Handle navigation to a new page
  const goToPage = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = (dropdownType) => {
    setOpenDropdown(openDropdown === dropdownType ? null : dropdownType);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      {/* Discovery World Logo with Link */}
      <div className="logo-container">
        <a
          href="https://www.discoveryworld.org" // External website link
          target="_blank" // Opens the link in a new tab
          rel="noopener noreferrer" // Security for external links
          className="logo-link"
        >
          <img
            src={discoveryWorldLogo}
            alt="Discovery World Logo"
            className="logo"
          />
        </a>
      </div>

      {/* Badge Icon and Dropdown */}
      <div className="badges-button" ref={dropdownRef}>
        <IoAddCircle
          className="badges-icon"
          onClick={() => toggleDropdown("badges")}
        />
        {openDropdown === "badges" && (
          <div className="dropdown-menu badges-dropdown">
            <button onClick={() => alert("Badge 1")}>Badge 1</button>
            <button onClick={() => alert("Badge 2")}>Badge 2</button>
          </div>
        )}
      </div>

      {/* User Icon and Dropdown */}
      <div className="user-profile" ref={dropdownRef}>
        <FaBars
          className="user-icon"
          onClick={() => toggleDropdown("account")}
        />
        {openDropdown === "account" && (
          <div className="dropdown-menu">
            <button onClick={() => goToPage("/account")}>Account</button>
            <button onClick={() => alert("Go to Badge Page")}>Badge</button>
            <button onClick={() => goToPage("/login")}>Sign In</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
