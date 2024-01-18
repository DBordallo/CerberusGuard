import React from 'react'
import AppSearch from '../../../components/searchs/appSearch/AppSearch'
import PasswordList from '../../../components/passwordsList/PasswordsList'
import "./UserHome.css"
import Image from 'react-bootstrap/Image';
import cerberusLogo from "../../../assets/cerberusLogo.jpg"
import grupo from "../../../assets/grupo.png"
import otherapps from "../../../assets/otherapps.png"


function UserHome() {
  return (
    <container className="userHome">
    
    <container className="headerSearch">
    <Image src={cerberusLogo}  className="cerberusLogo" />
        <AppSearch/>
        <h6>Manage</h6>
        <h3>Your passwords</h3>
        <div className='appType'>
        <section className='socials typeBtn'>
            <div>
                <img src="" alt="" />
            </div>
            <Image src={grupo}  className="icon" />
            <h3>Socials</h3>
            {/*Hacer solicitud get de la cantidad de app del usuario*/}
        </section>
        <section className='apps typeBtn'>
            <div>
                <img src="" alt="" />
            </div>
            <Image src={otherapps}  className="icon" />
            <h3>Apps</h3>
            {/*Hacer solicitud get de la cantidad de app del usuario*/}
        </section>
        </div>
        </container>
        <section className='myPasswords'>
            <PasswordList/>
        </section>
    </container>

  )
}

export default UserHome