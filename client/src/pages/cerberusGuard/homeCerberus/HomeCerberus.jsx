import React from 'react'
import AdminUserSearch from '../../../components/searchs/adminUserSearch/AdminUserSearch';
import PasswordList from '../../../components/passwordsList/PasswordsList'
import "./HomeCerberus.css"
import Image from 'react-bootstrap/Image';
import cerberusLogo from "../../../assets/cerberusLogo.jpg"
import grupo from "../../../assets/grupo.png"
import otherapps from "../../../assets/otherapps.png"
import UsersList from '../../../components/usersList/UsersList';
import Logout from '../../../components/logout/Logout';


function HomeCerberus() {
  return (
    <container className="userHome">
    
    <container className="headerSearch">
    <Image src={cerberusLogo}  className="cerberusLogo" />
        <AdminUserSearch/>
        <Logout condicion={condicion}/>
        <h3>Users</h3>
        <div className='appType'>
        </div>
        </container>
        <section className='myPasswords'>
            <UsersList/>
        </section>
    </container>

  )
}

export default HomeCerberus