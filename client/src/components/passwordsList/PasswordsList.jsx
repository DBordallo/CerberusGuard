import React, { useState, useEffect } from "react";
import "./PasswordList.css"
import Pagination from "../pagination/Pagination"
import New1 from "../../assets/instagram.svg"
import New2 from "../../assets/facebook.png"
import New3 from "../../assets/x-twitter.png"




const apiUrl = [
    {
      "id": 1,
      "title": "Instagram",
      "image": `${New1}`,
      "name": "Pepito",
      "email": "pepito@mail.com"
    },
    {
        "id": 2,
        "title": "Facebook",
        "image": `${New2}`,
        "name": "Pepito2",
        "email": "pepito2@mail.com"
    },
    {
        "id": 3,
        "title": "X",
        "image": `${New3}`,
        "name": "Pepito3",
        "email": "pepito3@mail.com"
    },
  ];
  
  const PasswordList = () => {
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
                <button className="Btn-more">+</button>
              </div>
            </li>
          ))}
        </ul>
        <Pagination className="pagination"
          totalItems={newsList.length}
          itemsPerPage={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  };
  
  export default PasswordList;
  