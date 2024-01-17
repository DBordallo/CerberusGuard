import React from 'react'
import AppSearch from '../../../components/searchs/appSearch/AppSearch'
import PasswordList from '../../../components/passwordsList/PasswordsList'
import "./UserHome.css"

function UserHome() {
  return (
    <container className="userHome">
    <container className="headerSearch">
        <AppSearch/>
        <h6>Manage</h6>
        <h3>Your passwords</h3>
        <div className='appType'>
        <section className='socials typeBtn'>
            <div>
                <img src="" alt="" />
            </div>
            <h3>Socials</h3>
            {/*Hacer solicitud get de la cantidad de app del usuario*/}
        </section>
        <section className='apps typeBtn'>
            <div>
                <img src="" alt="" />
            </div>
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