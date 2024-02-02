import React, { useState, useEffect, useContext } from 'react';
import AppSearch from '../../../components/searchs/appSearch/AppSearch';
import PasswordList from '../../../components/passwordsList/PasswordsList';
import "./UserHome.css";
import Image from 'react-bootstrap/Image';
import cerberusLogo from "../../../assets/cerberusLogo.jpg";
import grupo from "../../../assets/grupo.png";
import otherapps from "../../../assets/otherapps.png";
import { AuthContext } from '../../../authcontext/AuthContext';
import { useAuth } from '../../../authcontext/AuthContext';
import Logout from '../../../components/logout/Logout';

function UserHome() {

    const [userData, setUserData] = useState(null);
    const [appCount, setAppCount] = useState(0);
    const {isUserAdmin} = useAuth()

    useEffect(() => {
        const getUserData = async () => {
            try {
                const result = await isUserAdmin();

                if (result) {
                    setUserData(result);
                    
                    // Obtener la cantidad de aplicaciones del usuario
                    const appsResponse = await fetch(`http://localhost:6700/cerberus/users/${result.user.id}/apps`);
                    if (!appsResponse.ok) {
                        console.error('Error al obtener la cantidad de aplicaciones del usuario');
                        return;
                    }

                    const appsData = await appsResponse.json();
                    setAppCount(appsData.length);
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
                <Logout />
                <AppSearch />
                <h6>Manage</h6>
                <h3>Your passwords</h3>
                <div className='appType'>
                    <section className='socials typeBtn'>
                        <div>
                            <img src="" alt="" />
                        </div>
                        <Image src={grupo} className="icon" />
                        <h3>Socials</h3>
                        <p>{`Cantidad de aplicaciones: ${appCount}`}</p>
                    </section>
                    <section className='apps typeBtn'>
                        <div>
                            <img src="" alt="" />
                        </div>
                        <Image src={otherapps} className="icon" />
                        <h3>Apps</h3>
                        <p>{`Cantidad de aplicaciones: ${appCount}`}</p>
                    </section>
                </div>
            </container>
            <section className='myPasswords'>
                <PasswordList />
            </section>
        </container>
    );
}

export default UserHome;
