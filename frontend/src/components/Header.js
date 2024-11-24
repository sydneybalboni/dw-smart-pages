import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../styles/Header.css";
import discoveryWorldLogo from "../assets/Discovery-World.svg";
import { FaUserCircle } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";

function importAllBadges(r) {
  return r.keys().map(r);
}
const badges = importAllBadges(require.context('../assets/badges', false, /\.(png)/))

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
      <div className="logo-container">
        <img
          src={discoveryWorldLogo}
          alt="Discovery World Logo"
          className="logo"
          onClick={() => goToPage("/")}
        />
      </div>


      {/* Badge Icon and Dropdown */}
      <div className="badges-button" ref={dropdownRef}>
        <IoAddCircle
          className="badges-icon"
          onClick={() => toggleDropdown("badges")}
        />
        {openDropdown === "badges" && (
          <div className="badges-dropdown">
            <p style={{
              fontFamily: "Poppins",
              textAlign: "center",
              fontSize: "24px",
              fontWeight: 500,
              color: "#201c51"
            }}>
              Badges
            </p>
            <div className="image-grid">
              {badges.map((image, index) => (
                <img key={index} 
                  src={image} 
                  alt='BadgeNotFound'
                  className="grid-item"
                />
              ))}
            </div>
          </div>
        )}
      </div> 

      {/* User Icon and Dropdown */}
      <div className="user-profile" ref={dropdownRef}>
        <FaUserCircle
          className="user-icon"
          onClick={() => toggleDropdown("account")}
        />
        {openDropdown === "account" && (
          <div className="dropdown-menu">
          <button onClick={() => goToPage("/account")}>Account</button>
          <button onClick={() => goToPage("/login")}>Sign In</button>
        </div>
        )}
      </div>
    </header>
  );
};

export default Header;
