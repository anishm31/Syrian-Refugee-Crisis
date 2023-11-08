import React, { useState, useEffect, useCallback } from "react";
import GenericModelPage from "./GenericModelPage";
import CountryCard from "./CountryCard";
import axios from "axios";
import  "./button.css";

function CountryModelPage({searchInput}) {

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [countLoaded, setCountLoaded] = useState(false);
  const [countryInstances, setCountryInstances] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchInput); // State for the search query
  const [totalPages, setTotalPages] = useState(1);
  const [totalInstances, setTotalInstances] = useState(0);

  const requestInstances = useCallback((userQuery) => {
    // Set loaded states to false
    setDataLoaded(false);
    setCountLoaded(false);
    // Define arguments for sorting/searching/filtering
    let searchArg = userQuery ? `&searchQuery=${userQuery}` : "";
    // TODO: filtering and sorting stuff
    let sortArg = "";
    let filterArg = "";

    let instanceCountURL = `https://api.syrianrefugeecrisis.me/countries?${searchArg}${sortArg}${filterArg}`;
    let instanceDataURL = `https://api.syrianrefugeecrisis.me/countries?${searchArg}${sortArg}${filterArg}&page=${currentPage}`;

    // Fetch the total number of instances
    axios
      .get(instanceCountURL)
      .then((response) => {
        setTotalInstances(response.data.count);
        setTotalPages(Math.ceil(response.data.count / itemsPerPage));
        setCountLoaded(true);
      })
      .catch((error) => {
        console.log("There was an error fetching the data", error);
      });

    // Fetch country instances
    axios
      .get(instanceDataURL)
      .then((response) => {
        setCountryInstances(response.data.data);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.log("There was an error fetching the data", error);
      });
  }, [currentPage]);

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

  const handleSearch = (query) => {
    // Change in state will trigger useEffect
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // useEffect for retrieving instances based on state changes
  useEffect(() => {
    console.log("USE EFFECT CALLED")
    requestInstances(searchQuery);
  }, [requestInstances, currentPage, searchQuery]);

  // Instance data loaded, render main content
  return (
    <div>
      <GenericModelPage
        model="Countries"
        modelCard={CountryCard}
        instances={countryInstances}
        totalInstances={totalInstances}
        handleSearch={handleSearch} // Pass handleSearch to the SearchBar
        loaded={dataLoaded && countLoaded}
      />
      {dataLoaded && countLoaded ? 
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
    : null}
    </div>
  );
}

export default CountryModelPage;
