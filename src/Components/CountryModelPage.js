import React, { useState, useEffect } from "react";
import GenericModelPage from "./GenericModelPage";
import CountryCard from "./CountryCard";
import axios from "axios";


function CountryModelPage() {

  const itemsPerPage = 12;
  const totalInstances = 127;
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [countryInstances, setCountryInstances] = useState([]);

  const totalPages = Math.ceil(totalInstances / itemsPerPage);

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

  // Fetch page of country instances from the API
  useEffect(() => {
    axios
      .get(`https://api.syrianrefugeecrisis.me/countries?page=${currentPage}`)
      .then((response) => {
        setCountryInstances(response.data.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log("There was an error fetching the data", error);
      });
  }, [currentPage]);

  // Verify that the country data has been loaded before rendering main content
  if (!loaded) {
    return <h1 style={{textAlign: "center"}}>Page Loading...</h1>;
  }

  // Instance data loaded, render main content
  return (
    <div>
      <GenericModelPage
        model="Countries"
        modelCard={CountryCard}
        instances={countryInstances}
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