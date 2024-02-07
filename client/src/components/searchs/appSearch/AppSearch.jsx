import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import lupa from "../../../assets/lupa.png"
import "./AppSearch.css"

const AppSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null); // Limpiar el error anterior
      const response = await fetch(`/api/passwords?app=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again later.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <h2 style={{textAlign:"center"}}>Password Manager</h2>
     
      <ul>
        {searchResults.map((password) => (
          <li key={password.id}>
            App: {password.appName}, Username: {password.username}, Password: {password.password}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppSearch;
