import React, { useState, useEffect } from "react";
import "../styles/AccountPage.css";
import Header from "./Header";

const AccountPage = () => {
  const [badges, setBadges] = useState([]);

  const loadBadges = () => {
    // Import all PNG images from the badges folder
    const badgesContext = require.context("../assets/badges", false, /\.png$/);
    const badgeImages = badgesContext.keys().map((key) => badgesContext(key));
    setBadges(badgeImages);
  };

  // Load badges when the component mounts
  useEffect(() => {
    loadBadges();
  }, []);

  const userName = "Your Name";

  return (
    <div>
      <Header />
      <div className="account-page">
        <div className="account-header">
          <h1>Account Page</h1>
          <h2>Welcome, {userName}</h2>
        </div>
        <div className="badges-section">
        <h3>Your Badges</h3>
        <div className="badges">
          {badges.map((src, index) => (
            <img key={index} src={src} alt={`Badge ${index + 1}`} className="badge-image" />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default AccountPage;