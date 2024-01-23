import React, { useState, useEffect } from "react";
import "./UsersList.css"
import Pagination from "../pagination/Pagination"
import Image from 'react-bootstrap/Image';
import Pet from "../../assets/pet.png"





const apiUrl = [
    {
      "id": 1,
      "image": `${Pet}`,
      "name": "Pepito",
      "email": "pepito@mail.com"
    },
    {
        "id": 2,
        "image": `${Pet}`,
        "name": "Pepito2",
        "email": "pepito2@mail.com"
    },
    {
        "id": 3,
        "image": `${Pet}`,
        "name": "Pepito3",
        "email": "pepito3@mail.com"
    },
    {
      "id": 4,
      "image": `${Pet}`,
      "name": "Pepito",
      "email": "pepito@mail.com"
    },
    {
        "id": 5,
        "image": `${Pet}`,
        "name": "Pepito2",
        "email": "pepito2@mail.com"
    },
    {
        "id": 6,
        "image": `${Pet}`,
        "name": "Pepito3",
        "email": "pepito3@mail.com"
    },
    {
      "id": 7,
      "image": `${Pet}`,
      "name": "Pepito",
      "email": "pepito@mail.com"
    },
    {
        "id": 8,
        "image": `${Pet}`,
        "name": "Pepito2",
        "email": "pepito2@mail.com"
    },
    {
        "id": 9,
        "image": `${Pet}`,
        "name": "Pepito3",
        "email": "pepito3@mail.com"
    },
  ];
  
  const UsersList = () => {
    const [newsList, setNewsList] = useState([]);
  
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
  
  
    useEffect(() => {
      setNewsList(apiUrl);
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
          {getCurrentPageData().map((news) => (
            <li key={news.id} className="PassItems">
              <div className="PassInfo">
              <Image src={Pet}  className="pet" />
              <div className="insideListGuard" >
                <p className="namePasslistGuard">{news.name}</p>
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
  
  export default UsersList;