import React, { useState } from 'react';
import './ErrorToast.scss';

// Composant qui affiche u toats contenant un message d'erreur si une erreur survient
export function ErrorToast({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false); 
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
