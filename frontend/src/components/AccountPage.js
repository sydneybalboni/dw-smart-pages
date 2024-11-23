import React from "react";
import "../styles/AccountPage.css";
import Header from "./Header";

const AccountPage = () => {
  const userName = "Your Name";
  const badges = [
    { id: 1, name: "Beginner Badge", icon: "🏅" },
    { id: 2, name: "Achievement Unlocked", icon: "🎖️" },
    { id: 3, name: "Code Master", icon: "💻" },
  ];

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
            {badges.map((badge) => (
              <div key={badge.id} className="badge">
                <span className="badge-icon">{badge.icon}</span>
                <span className="badge-name">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;