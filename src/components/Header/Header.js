import React from "react";
import "./Header.scss";

// Composant de l'en-tête contenant le nom de l'utilisateur
export function Header({ profile }) {
  
  // Récupère le profil de l'utilisateur
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
