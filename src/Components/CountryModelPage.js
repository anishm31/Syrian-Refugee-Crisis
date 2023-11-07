import React, { useState, useEffect } from "react";
import GenericModelPage from "./GenericModelPage";
import CountryCard from "./CountryCard";
import axios from "axios";
import  "./button.css";

function CountryModelPage() {

  const itemsPerPage = 12;
  const totalInstances = 127;
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [countryInstances, setCountryInstances] = useState([]);

  const totalPages = Math.ceil(totalInstances / itemsPerPage);
  const [selectedSortOption, setSelectedSortOption] = useState("");

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (sortingKey) => {
    setSelectedSortOption(sortingKey);
    fetchCountries(sortingKey, 1)
  };

  const fetchCountries = (sortingKey, page) => {
    axios
      .get(`https://api.syrianrefugeecrisis.me/countries?&sortBy=${sortingKey}&sortOrder=asc&page=${page}`)
      .then((response) => {
        setCountryInstances(response.data.data);
        setLoaded(true);
        setCurrentPage(page);
      })
      .catch((error) => {
        console.log("There was an error fetching the data", error);
      });
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // Fetch page of country instances from the API
  useEffect(() => {
    fetchCountries(selectedSortOption, currentPage);
  }, [selectedSortOption, currentPage]);

  // Instance data loaded, render main content
  return (
    <div>
      <GenericModelPage
        model="Countries"
        modelCard={CountryCard}
        instances={countryInstances}
        totalInstances={totalInstances}
        handleSort = {handleSort}
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
            id = "page-button"
            className={`page-button ${pageNumber === currentPage ? 'active' : ''}`}
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
