import React, { useState, useEffect } from "react";
import "./UsersList.css";
import Pagination from "../pagination/Pagination";
import Image from "react-bootstrap/Image";
import Pet from "../../assets/pet.png";
import deletes from '../../assets/delete.png';

const UsersList = () => {
  const [usersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:6700/cerberus/users");
        if (!response.ok) {
          console.error("Error al obtener los usuarios");
          return;
        }

        const usersData = await response.json();
        setUsersList(usersData);
      } catch (error) {
        console.error("Error al recibir los usuarios", error);
      }
    };

    getUsers();
  }, []);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return usersList.slice(startIndex, endIndex);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:6700/cerberus/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsersList(usersList.filter(user => user.id !== userId));
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="containerListGuard">
      <h2>User List</h2>
      <ul className="listPass">
        {getCurrentPageData().map((user) => (
          <li key={user.id} className="PassItems">
            <div className="PassInfo">
              <Image src={Pet} className="pet" />
              <div className="insideListGuard">
                <p className="namePasslistGuard">{user.user_name}</p>
                <p className="emailPasslist">{user.user_email}</p>
              </div>
              <button className="editbtn" onClick={() => handleDeleteUser(user.id)}>                        <img className ="deleteimg"  src={deletes} alt="delete" /></button>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <Pagination
          totalItems={usersList.length}
          itemsPerPage={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UsersList;
