import React, { useState, useEffect } from "react";
import "./PasswordList.css";
import Pagination from "../pagination/Pagination";
import { useAuth } from "../../authcontext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import eye from "../../assets/eye.png";
import closeeye from '../../assets/closeeye.png';
import deletes from '../../assets/delete.png';
import edit from '../../assets/edit.png';


const PasswordList = () => {
  const { isUserAdmin } = useAuth();
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [userAccounts, setUserAccounts] = useState([]);
  const [passwordVisibility, setPasswordVisibility] = useState({}); // Nuevo estado para controlar la visibilidad de las contraseñas
  const history = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const result = await isUserAdmin();

        if (result) {
          setUserData(result);
          const appsResponse = await fetch(
            `http://localhost:6700/cerberus/accounts/acc/${result.user.id}`
          );
          if (appsResponse.ok) {
            const accountsData = await appsResponse.json();
            setUserAccounts(accountsData);
            // Inicializar el estado de la visibilidad de las contraseñas para cada cuenta
            const initialVisibility = {};
            accountsData.forEach(account => {
              initialVisibility[account.id] = false;
            });
            setPasswordVisibility(initialVisibility);
          } else {
            console.error(
              'Error al obtener la cantidad de aplicaciones del usuario'
            );
          }
        } else {
          console.error('Error al obtener los datos de usuario');
        }
      } catch (error) {
        console.error('Error al recibir los datos del usuario', error);
      }
    };

    getUserData();
  }, [isUserAdmin]);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return userAccounts.slice(startIndex, endIndex);
  };

  const handleEdit = (accountId) => {
    history(`/editaccount/${accountId}`);
  };

  const handleDelete = async (accountId) => {
    try {
      const response = await fetch(`http://localhost:6700/cerberus/accounts/${accountId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUserAccounts(userAccounts.filter(account => account.id !== accountId));
      } else {
        console.error('Error deleting account:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const togglePasswordVisibility = (accountId) => {
    setPasswordVisibility({
      ...passwordVisibility,
      [accountId]: !passwordVisibility[accountId],
    });
  };

  return (
    <div className="containerList">
      <h2>My Passwords</h2>
      {userAccounts.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No saved passwords. <br/><Link to={`/addaccount/${userData?.user?.id}`}>Click here to start saving your passwords.</Link> </p>
      ) : (
        <>
          <ul className="listPass">
            {userAccounts.length > 0 &&
              getCurrentPageData().map((account) => (
                <li key={account.id} className="PassItems">
                  <div className="PassInfo">
                    {account.preAccounts && account.preAccounts.app_img && account.preAccounts.app_names && (
                      <>
                        <img
                          src={account.preAccounts.app_img.secure_url}
                          alt={`Imagen de ${account.preAccounts.app_names}`}
                          style={{ width: "3rem", maxWidth: "100px" }}
                        />
                        <div className="insideList">
                          <h3 className="titlePasslist">{account.preAccounts.app_names}</h3>
                          <p className="emailPasslist">{account.email}</p>
                          <p className="usernamePasslist">{account.username}</p>
                          <p className="passwordPasslist">
                            {passwordVisibility[account.id]
                              ? account.password
                              : "••••••••"}
                          </p>
                        </div>
                        <div className="allBtn">
                        <Button className="editbtn" variant="outline-secondary" onClick={() => handleEdit(account.id)}>
                        <img className ="editimg"  src={edit} alt="edit" />
                        </Button>
                        <Button className="editbtn" variant="outline-danger" onClick={() => handleDelete(account.id)}>
                        <img className ="deleteimg"  src={deletes} alt="delete" />
                        </Button>
                        <Button className="editbtn"
  variant="outline-info"
  onClick={() => togglePasswordVisibility(account.id)}
>
  <img
    src={passwordVisibility[account.id] ? closeeye : eye}
    alt={passwordVisibility[account.id] ? 'close eye' : 'eye'}
    style={{ width: '20px', height: '20px', marginRight: '5px' }}
  />
</Button>
</div>

                      </>
                    )}
                  </div>
                </li>
              ))}
          </ul>
          <div className="pagination">
            <Pagination
              totalItems={userAccounts.length}
              itemsPerPage={pageSize}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PasswordList;
