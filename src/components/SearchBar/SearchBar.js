import React, { useState } from 'react';
import './SearchBar.scss';

// Composant de la barre de recherche
export function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  //Met à jour de la recherche à chaque changement de l'input
  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  // Efface le contenu de la barre de recherche
  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleChange}
      />
      {searchTerm && (
        <button className="clear-btn" onClick={handleClear}>
          &#x2715;
        </button>
      )}
    </div>
  );
}
