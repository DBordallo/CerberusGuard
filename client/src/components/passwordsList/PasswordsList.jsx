import React, { useState, useEffect } from "react";
import "./PasswordList.css"
import Pagination from "../pagination/Pagination"
import { useAuth } from "../../authcontext/AuthContext";


  const PasswordList = () => {
    const [newsList, setNewsList] = useState([]);
    const {isUserAdmin} = useAuth()
    const [userData, setUserData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
  
  
    useEffect(() => {
      const getUserData = async () => {
          try {
              const result = await isUserAdmin();

              if (result) {
                  setUserData(result);
                  const appsResponse = await fetch(`http://localhost:6700/cerberus/accounts/acc/${result.user.id}`);
                  if (!appsResponse.ok) {
                      console.error('Error al obtener la cantidad de aplicaciones del usuario');
                      return;
                  }
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
  
  
    const getCurrentPageData = () => {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return newsList.slice(startIndex, endIndex);
    };
  
    return (
      <div className="containerList">
        <h2>My Passwords</h2>
        <ul className="listPass">
          {getCurrentPageData().map((news) => (
            <li key={news.id} className="PassItems">
              <div className="PassInfo">
                <img src={news.image} alt={`Imagen de ${news.title}`} style={{ width:"3rem", maxWidth: "100px"}} />
              <div className="insideList" >
                <h3 className="titlePasslist">{news.title}</h3>
                <p className="namePasslist">{news.name}</p>
                <p className="emailPasslist">{news.email}</p>
                </div>
                <button className="Btn-more">.<br/>.<br/>.</button>
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
  
  export default PasswordList;
  