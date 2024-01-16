import React from 'react'
import AppSearch from '../../../components/searchs/appSearch/AppSearch'
import PasswordList from '../../../components/passwordsList/PasswordsList'

function UserHome() {
  return (
    <>
        <AppSearch/>
        <h6>Manage</h6>
        <h3>Your passwords</h3>
        <section className='socials'>
            <div>
                <img src="" alt="" />
            </div>
            <h3>Socials</h3>
            {/*Hacer solicitud get de la cantidad de app del usuario*/}
        </section>
        <section className='apps'>
            <div>
                <img src="" alt="" />
            </div>
            <h3>Apps</h3>
            {/*Hacer solicitud get de la cantidad de app del usuario*/}
        </section>

        <section className='myPasswords'>
            <PasswordList/>
        </section>
    </>

  )
}

export default UserHome