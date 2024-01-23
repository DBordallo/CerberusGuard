import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import lupa from "../../../assets/lupa.png"

const AdminUserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/admin/users?search=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2 style={{textAlign:"center"}}>Admin</h2>
      <input
      className='searchImput'
        type="text"
        placeholder="Search by username or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="lupaBtn" onClick={handleSearch}><Image src={lupa}  className="lupa" /></button>

      <ul>
        {searchResults.map((user) => (
          <li key={user.id}>
            Username: {user.username}, Email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUserSearch;
