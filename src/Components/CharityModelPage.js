import React, { useState } from "react";
import GenericModelPage from "./GenericModelPage";
import CharityCard from "./CharityCard";
import charityData from "../model_data/charity_db.json"

function CharityModelPage() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(charityData.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedCharityData = charityData.slice(startIndex, endIndex);
  return (
    <div>
    <GenericModelPage
      model="Charities"
      modelCard={CharityCard}
      instances={paginatedCharityData}
    />
    <div className="pagination">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {generatePageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageClick(pageNumber)}
          className={pageNumber === currentPage ? "active" : ""}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  </div>
   
  );
}


export default CharityModelPage;


/*
 <GenericModelPage //test
      model="Charities"
      modelCard={CharityCard}
      instances={charityData}
    />
*/