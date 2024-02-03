import React from 'react';
import { useAuth } from '../../authcontext/AuthContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout();
      console.log('Logout successful');
      navigate("/")
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
