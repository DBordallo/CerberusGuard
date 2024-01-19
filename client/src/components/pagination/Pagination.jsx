import React, { useState, useEffect } from 'react';
import "./Pagination.css"

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const getPageNumbers = () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pagesToShow = [];

    // Mostrar las 3 primeras páginas
    pagesToShow.push(1, 2, 3);

    // Mostrar las páginas intermedias y la última página
    const startPage = Math.max(currentPage - 1, 4);
    const endPage = Math.min(currentPage + 1, totalPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    // Mostrar la última página
    pagesToShow.push(totalPages);

    return pagesToShow;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="pagination-container">
      <button className="pagination-button" onClick={handlePrevPage}>
        &lt;
      </button>
      {getPageNumbers().map((pageNumber, index) => (
        <React.Fragment key={index}>
          {index > 0 && pageNumber !== getPageNumbers()[index - 1] + 1 && '...'}
          <button
            onClick={() => handlePageChange(pageNumber)}
            className={`pagination-button ${pageNumber === currentPage ? 'current-page' : ''}`}
          >
            {pageNumber}
          </button>
        </React.Fragment>
      ))}
      <button className="pagination-button" onClick={handleNextPage}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
``
