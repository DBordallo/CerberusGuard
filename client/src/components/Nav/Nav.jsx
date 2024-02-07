import {Link} from 'react-router-dom'
import './Nav.css'
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../authcontext/AuthContext';



function Nav({home, password, profile}){
  const [userData, setUserData] = useState(null);
  const { isUserAdmin } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await isUserAdmin();
        if (result) {
          const userDetailsResponse = await fetch(`https://backend-cerberus.onrender.com/cerberus/users/${result.user.id}`);
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
      <div className="containerFooter">
    <nav className="navBar">
      <Link to={`/home/${userData.user.id}`} className="navButton homeButton">
        <img className="buttonImg" src={home} alt="Image of the Home Icon" />
      </Link>
      <Link to={`/addaccount/${userData.user.id}`} className="navButton passwordButton">
        <img className="buttonImg" src={password} alt="Image of the Password Icon" />
      </Link>
      <Link to={`/profile/${userData.user.id}`} className="navButton profileButton">
        <img className="buttonImg" src={profile} alt="Image of the Profile Icon" />
      </Link>
    </nav>
    </div>
    )
}

export default Nav;