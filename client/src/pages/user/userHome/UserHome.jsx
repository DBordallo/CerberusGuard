import React, { useState, useEffect } from 'react';
import AppSearch from '../../../components/searchs/appSearch/AppSearch';
import PasswordList from '../../../components/passwordsList/PasswordsList';
import "./UserHome.css";
import Image from 'react-bootstrap/Image';
import cerberusLogo from "../../../assets/cerberusLogo.jpg";
import { useAuth } from '../../../authcontext/AuthContext';
import Logout from '../../../components/logout/Logout';
import Nav from '../../../components/Nav/Nav';
import passwordGray from "../../../assets/passwordGray.png";
import homeWhite from "../../../assets/homeWhite.png";
import profileGray from "../../../assets/profileGray.png"

function UserHome() {
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

  return (
    <container className="userHome">
      <container className="headerSearch">
        <Image src={cerberusLogo} className="cerberusLogo" />
          <img src={userData.user.profile_img.secure_url} alt="Profile" className="profileImg" />

        <h2>Welcome, {userData.user.user_name}</h2>
        <Logout />
        <br />
        <AppSearch />
        <h4>Your passwords</h4>
        <h6>Manage</h6>
        <br />
      </container>
            <section className='myPasswords'>
                <br />
                <PasswordList />
            <Nav home = {homeWhite} password={passwordGray} profile ={profileGray} ></Nav>
            </section>

    </container>
    );
}

export default UserHome;
