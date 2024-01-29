import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './UserInfo.css';
 

function CerberusDetails() {

    const [userData, setUserData] = useState(null);
    const { userId } = useParams();
    
  useEffect(() => {
      const getUserData = async () => {
          try {
              const response = await fetch(`http://localhost:6700/cerberus/users/${userId}`);
              if (!response.ok) {
                  console.error('Error al obtener los datos de usuario');
                     return;
                 }
    
                 const data = await response.json();
                 setUserData(data);
             } catch (error) {
                    console.error('Error al recibir los datos del usuario', error);
             }
         };
    
         getUserData();
     }, [userId]);
    
     if (!userData) {
         return null;
     }

    return (
    <div className='userContainer'>
        <section>
            <img src={userData.userImg} alt="Imagen de perfil del usuario" className="userImg" />
        </section>

        <section className="userCard">
            <h2 className="userName">{userData.userName}</h2>
            <ul>
                <li>
                    <p>Email: {userData.email}</p>
                </li>
                <li>
                    <p>Phone: {userData.phone}</p>
                </li>
            </ul>
        </section>
    </div>
);
}

export default CerberusDetails;

