import React, { useState, useEffect } from 'react';
import './SearchBar.scss';

export function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Mettre à jour le terme de recherche et appeler la fonction de recherche
  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  // Effacer le terme de recherche
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
