 import React, { useState, useEffect } from 'react';
 import './UserInfo.css';
 import { useAuth } from '../../authcontext/AuthContext';

 function UserInfo() {
     const [userData, setUserData] = useState(null);
     const { isUserAdmin } = useAuth();


      useEffect(() => {
          const getUserData = async () => {
            try {
                const result = await isUserAdmin();
        
                if (result) {
        
                  const userDetailsResponse = await fetch(`http://localhost:6700/cerberus/users/${result.user.id}`);
                  if (!userDetailsResponse.ok) {
                    console.error('Error al obtener la información del usuario');
                    return;
                  }
        
                  const userDetailsData = await userDetailsResponse.json();
                  setUserData(userDetailsData)
                  console.log('Información del usuario:', userDetailsData);
                } else {
                  console.error('Error al obtener los datos de usuario');
                }
              } catch (error) {
                console.error('Error al recibir los datos del usuario', error);
              }
            };
        
            getUserData();
          }, []);
        
          if (!userData) {
            return null;
          }

     const [isEditing, setIsEditing] = useState(false);
    

     return (
         <container className='userContainer'>
             <section>
                 <img src={userData.user.profile_img.secure_url} alt="Imagen de perfil del usuario" className="userImg" />
             </section>

             <section className="userCard">
                 <h2 clasName="userName"> {userData.user.user_name}</h2>
                 <button onClick={!isEditing}></button>
                 <ul>
                 {isEditing ? (
                             <UserForm
                                 email={userData.user_email}
                                 phone={userData.user_telephone}
                                 onEmailChange={(e) => setEmail(e.target.value)}
                                 onPhoneChange={(e) => setPhone(e.target.value)}
                                 onSave={handleSave}
                             />
                         ): (
                             <p>E-mail: {userData.user_email}</p>
                         )}
                     <li className>
                         <p>E-mail: {userData.user_email}</p>
                     </li>
                     <li>
                         <p>Phone: {userData.user_telephone}</p>
                     </li>
                 </ul>
             </section>
         </container>
     );
 }

 export default UserInfo;

