import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './UserInfo.css';
import userImg from '../../assets/profilePhoto.png'

function UserInfo() {
    const [userData, setUserData] = useState(null);
    const { userId } = useParams();

    // useEffect(() => {
    //     const getUserData = async () => {
    //         try {
    //             const response = await fetch(`/user/${userId}`);
    //             if (!response.ok) {
    //                 console.error('Error al obtener los datos de usuario');
    //                 return;
    //             }

    //             const data = await response.json();
    //             setUserData(data);
    //         } catch (error) {
    //             console.error('Error al recibir los datos del usuario', error);
    //         }
    //     };

    //     getUserData();
    // }, [userId]);

    // if (!userData) {
    //     return null;
    // }

    const { userImg, userName, email, phone } = userData;


    const [isEditing, setIsEditing] = useState(false);
    

    return (
        <container className='userContainer'>
            <section>
                <img src={userImg} alt="Imagen de perfil del usuario" className="userImg" />
            </section>

            <section className="userCard">
                <h2 clasName="userName">{userName}</h2>
                <button onClick={!isEditing}></button>
                <ul>
                {isEditing ? (
                            <UserForm
                                email={email}
                                phone={phone}
                                onEmailChange={(e) => setEmail(e.target.value)}
                                onPhoneChange={(e) => setPhone(e.target.value)}
                                onSave={handleSave}
                            />
                        ): (
                            <p>E-mail: {email}</p>
                        )}
                    <li className>
                        <p>E-mail: {email}</p>
                    </li>
                    <li>
                        <p>Phone: {phone}</p>
                    </li>
                    <li>
                        <Link to="/passwordReset">Change your Password</Link>
                    </li>
                    <li>
                        {isEditing ? (
                            <button onClick={handleSave}>Save</button>
                        ) : (
                            <button onClick={handleEdit}>Edit</button>
                        )}
                    </li>
                </ul>
            </section>
            <p>hola</p>
        </container>
    );
}

export default UserInfo;

