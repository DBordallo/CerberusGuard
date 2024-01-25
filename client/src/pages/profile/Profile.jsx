import React from "react";
import UserInfo from "../../components/UserInfo/UserInfo";
import Header from "../../components/header/Header.jsx";
import Nav from "../../components/Nav/Nav.jsx";
import homeGray from "../../assets/homeGray.png";
import passwordGray from "../../assets/passwordGray.png";
import profileWhite from "../../assets/profileWhite.png";


function Profile(){
    return(
        <>
            <Header sectionTitle = "Profile"></Header>
            <h1>Hola</h1>
            <UserInfo></UserInfo>
            <Nav home = {homeGray} password={passwordGray} profile ={profileWhite} ></Nav>
        </>
        
    )
}
export default Profile;