import React, { useState, useEffect } from "react";
import "./UsersList.css";
import Pagination from "../pagination/Pagination";
import Image from "react-bootstrap/Image";
import Pet from "../../assets/pet.png";

const UsersList = () => {
  const [newsList, setNewsList] = useState([]);
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
        setNewsList(usersData);
      } catch (error) {
        console.error("Error al recibir los usuarios", error);
      }
    };

    getUsers();
  }, []);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return newsList.slice(startIndex, endIndex);
  };

  return (
    <div className="containerListGuard">
      <h2></h2>
      <ul className="listPass">
        {getCurrentPageData().map((user) => (
          <li key={user.id} className="PassItems">
            <div className="PassInfo">
              <Image src={Pet} className="pet" />
              <div className="insideListGuard">
                <p className="namePasslistGuard">{user.user_name}</p>
                <p className="emailPasslist">{user.user_email}</p>
              </div>
              <button className="Btn-more">.<br />.<br />.</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <Pagination
          totalItems={newsList.length}
          itemsPerPage={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UsersList;
