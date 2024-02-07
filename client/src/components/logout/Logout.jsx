import React from 'react';
import { useAuth } from '../../authcontext/AuthContext';
import { useNavigate } from 'react-router-dom';
import logouts from '../../assets/logout.png'


function Logout({ condicion }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    let currentCondicion;
    try {
      await logout();
      console.log('Logout successful');
      currentCondicion = condicion;
      console.log("Condicion after logout:", currentCondicion);
    } catch (error) {
      console.error('Error during logout:', error.message);
    } finally {
      navigate("/");
    }
  };

  return (
    <button onClick={handleLogout} >
    Logout
      <img className ="logout"  src={logouts} alt="logout" />
      
    </button>
  );
}

export default Logout;

