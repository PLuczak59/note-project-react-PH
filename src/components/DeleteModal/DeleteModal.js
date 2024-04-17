import React, { useEffect } from "react";
import "./DeleteModal.scss";

// Composant de la fenêtre modale de suppression
const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  // Vérifie si la touche "Echap" est pressée pour fermer la fenêtre modale
  useEffect(() => {
    const handleEscKeyPress = (event) => {
      if (event.keyCode === 27 && isOpen) { 
        onClose(); 
      }
    };

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress); 
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay" onClick={onClose}>
      <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal-header">
          <h2>Voulez-vous supprimer cette note ?</h2>
        </div>
        <div className="delete-modal-body">
          <p>
            La suppression de la note est une opération définitive. <br />
            Vous perdrez toutes les données associées à cette note.
          </p>
        </div>
        <div className="delete-modal-footer">
          <button onClick={onClose}>Annuler</button>
          <button onClick={onDelete}>Confirmer</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
