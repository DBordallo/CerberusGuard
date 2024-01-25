import React from 'react';
import {Link} from 'react-router-dom'
import './Nav.css'


function Nav({home,password,profile}){
    return(
    <nav className="navBar">
      <Link to="/" className="navButton homeButton">
        <img className="buttonImg" src={home} alt="Image of the Home Icon" />
      </Link>
      <Link to="/password" className="navButton passwordButton">
        <img className="buttonImg" src={password} alt="Image of the Password Icon" />
      </Link>
      <Link to="/profile" className="navButton profileButton">
        <img className="buttonImg" src={profile} alt="Image of the Profile Icon" />
      </Link>
    </nav>
    )
}

export default Nav;