import React, { useState } from 'react';

const AppSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/passwords?app=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Password Manager</h2>
      <input
        type="text"
        placeholder="Search by app name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

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
