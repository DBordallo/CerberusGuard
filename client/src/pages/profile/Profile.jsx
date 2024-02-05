import Header from "../../components/header/Header.jsx";
import Nav from "../../components/Nav/Nav.jsx";
import homeGray from "../../assets/homeGray.png";
import passwordGray from "../../assets/passwordGray.png";
import profileWhite from "../../assets/profileWhite.png";
import React, { useState, useEffect } from 'react';
import '../../components/UserInfo/UserInfo.css';
import { useAuth } from '../../authcontext/AuthContext';


function Profile() {
    const [userData, setUserData] = useState(null);
    const { isUserAdmin } = useAuth();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await isUserAdmin();
          if (result) {
            const userDetailsResponse = await fetch(`http://localhost:6700/cerberus/users/${result.user.id}`);
            if (!userDetailsResponse.ok) {
              console.error('Error fetching user details');
              return;
            }
  
            const userDetailsData = await userDetailsResponse.json();
            setUserData(userDetailsData);
          } else {
            console.error('Error fetching user details');
          }
        } catch (error) {
          console.error('Error fetching user details', error);
        }
      };
  
      fetchData();
    }, [isUserAdmin]);
  
    if (!userData) {
      return null;
    }
   
    return(
        <>
            <div className='userContainer'>
            <Header sectionTitle = "Profile"></Header>
             <section>
                 <img src={userData.user.profile_img.secure_url} alt="Imagen de perfil del usuario" className="userImg" />
             </section>

             <section className="userCard">
                 <h2 className="userName"> {userData.user.user_name}</h2>
                 <ul>
                     <li className>
                         <p>E-mail: {userData.user.user_email}</p>
                     </li>
                     <li>
                         <p>Phone: {userData.user.user_telephone}</p>
                     </li>
                 </ul>
             </section>
         </div>
            <Nav home = {homeGray} password={passwordGray} profile ={profileWhite} ></Nav>
        </>
        
    )
}
export default Profile