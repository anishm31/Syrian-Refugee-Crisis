import React, { useState } from "react";
import GenericModelPage from "./GenericModelPage";
import CountryCard from "./CountryCard";
import countryData from "../model_data/country_db.json";

function CountryModelPage() {

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(countryData.length / itemsPerPage);

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

  const paginatedCountryData = countryData.slice(startIndex, endIndex);
  return (
    <div>
    <GenericModelPage
      model="Countries"
      modelCard={CountryCard}
      instances={paginatedCountryData}
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

export default CountryModelPage;

/* <GenericModelPage
model="Countries"
modelCard={CountryCard}
instances={countryData}
/>*/