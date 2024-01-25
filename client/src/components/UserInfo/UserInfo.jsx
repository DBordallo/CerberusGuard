import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserInfo.css';
import userImg from '../../assets/profilePhoto.png';
 

function UserInfo() {
    const [userData, setUserData] = useState({
        id: 1,
        userImg: userImg,
        userName: "Pepito",
        email: "test@test.com",
        phone: "622222222"
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // Aquí deberías implementar la lógica para guardar los cambios
        setIsEditing(false);
    };

    return (
    <div className='userContainer'>
        <section>
            <img src={userData.userImg} alt="Imagen de perfil del usuario" className="userImg" />
        </section>

        <section className="userCard">
            <h2 className="userName">{userData.userName}</h2>
            <button onClick={handleEdit}>Edit</button>
            <ul>
                {isEditing ? (
                    <>
                        <li>
                            <label>Email: </label>
                            <input
                                type="text"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            />
                        </li>
                        <li>
                            <label>Phone: </label>
                            <input
                                type="text"
                                value={userData.phone}
                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                            />
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <p>Email: {userData.email}</p>
                        </li>
                        <li>
                            <p>Phone: {userData.phone}</p>
                        </li>
                        <li>
                            <Link to="/passwordReset">Change your Password</Link>
                        </li>
                    </>
                )}
               
                <li>
                    {isEditing ? (
                        <button onClick={handleSave}>Save</button>
                    ) : null}
                </li>
            </ul>
        </section>
    </div>
);
}

export default UserInfo;

// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import './UserInfo.css';
// import userImg from '../../assets/profilePhoto.png'

// function UserInfo() {
//     const [userData, setUserData] = useState(null);
//     const { userId } = useParams();

//     // useEffect(() => {
//     //     const getUserData = async () => {
//     //         try {
//     //             const response = await fetch(`/user/${userId}`);
//     //             if (!response.ok) {
//     //                 console.error('Error al obtener los datos de usuario');
//     //                 return;
//     //             }

//     //             const data = await response.json();
//     //             setUserData(data);
//     //         } catch (error) {
//     //             console.error('Error al recibir los datos del usuario', error);
//     //         }
//     //     };

//     //     getUserData();
//     // }, [userId]);

//     // if (!userData) {
//     //     return null;
//     // }
//     let users =[{
//         id: 1,
//         ProfileImg: {userImg},
//         Name: "Pepito",
//         userEmail:"test@test.com",
//         phone: "622222222"


//     }

//     ]
//     setUserData(users[1])

//     const { userImg, userName, email, phone } = userData;


//     const [isEditing, setIsEditing] = useState(false);
    

//     return (
//         <container className='userContainer'>
//             <section>
//                 <img src={userImg} alt="Imagen de perfil del usuario" className="userImg" />
//             </section>

//             <section className="userCard">
//                 <h2 clasName="userName">{userName}</h2>
//                 <button onClick={!isEditing}></button>
//                 <ul>
//                 {isEditing ? (
//                             <UserForm
//                                 email={email}
//                                 phone={phone}
//                                 onEmailChange={(e) => setEmail(e.target.value)}
//                                 onPhoneChange={(e) => setPhone(e.target.value)}
//                                 onSave={handleSave}
//                             />
//                         ): (
//                             <p>E-mail: {email}</p>
//                         )}
//                     <li className>
//                         <p>E-mail: {email}</p>
//                     </li>
//                     <li>
//                         <p>Phone: {phone}</p>
//                     </li>
//                     <li>
//                         <Link to="/passwordReset">Change your Password</Link>
//                     </li>
//                     <li>
//                         {isEditing ? (
//                             <button onClick={handleSave}>Save</button>
//                         ) : (
//                             <button onClick={handleEdit}>Edit</button>
//                         )}
//                     </li>
//                 </ul>
//             </section>
//             <p>hola</p>
//         </container>
//     );
// }

// export default UserInfo;

