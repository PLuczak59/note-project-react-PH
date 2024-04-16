import React, { useState } from 'react';
import './ErrorToast.scss';

export function ErrorToast({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false); // Définir isVisible sur false pour déclencher l'animation de disparition
  };

  return (
    <>
      <div className={`toast-container ${isVisible ? '' : 'hidden'}`}>
        <p className="toast-message">{message}</p>
        <span className="toast-close-btn" onClick={handleClose}>&times;</span>
      </div>
    </>
  );
}
