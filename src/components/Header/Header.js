import React from "react";
import "./Header.scss";

export function Header({ profile }) {
  const userProfile = Array.isArray(profile) && profile.length > 0 ? profile[0] : null;

  return (
    <header className="Header">
      <div className="Status-bar">
        {userProfile ? (
          <p>{userProfile.name}</p>
        ) : (
          <p>Chargement du profil...</p>
        )}
      </div>
    </header>
  );
}
