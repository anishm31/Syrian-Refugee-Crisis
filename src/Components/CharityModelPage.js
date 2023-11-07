import React, { useState, useEffect } from "react";
import GenericModelPage from "./GenericModelPage";
import CharityCard from "./CharityCard";
import axios from "axios";
import "./button.css"


function CharityModelPage() {
  
  const itemsPerPage = 12;
  const totalInstances = 48;
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [charityInstances, setCharityInstances] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const totalPages = Math.ceil(totalInstances / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (sortingKey) => {
    setSelectedSortOption(sortingKey);
    fetchCharities(sortingKey,1);
  }

  const fetchCharities =(sortingKey, page) =>{
    axios
      .get(`https://api.syrianrefugeecrisis.me/charities?&sortBy=${sortingKey}&sortOrder=asc&page=${page}`)
      .then((response) => {
        setCharityInstances(response.data.data);
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

  // Fetch page of charity instances from the API
  // useEffect(() => {
  //   axios
  //     .get(`https://api.syrianrefugeecrisis.me/charities?page=${currentPage}`)
  //     .then((response) => {
  //       setCharityInstances(response.data.data);
  //       setLoaded(true);
  //     })
  //     .catch((error) => {
  //       console.log("There was an error fetching the data", error);
  //     });
  // }, [currentPage]);

  // // Verify that the charity data has been loaded before rendering main content
  // if (!loaded) {
  //   return <h1 style={{textAlign: "center"}}>Page Loading...</h1>;
  // }
  useEffect(() => {
    fetchCharities(selectedSortOption, currentPage);
  }, [selectedSortOption, currentPage]);


  return (
    <div>
      <GenericModelPage
        model="Charities"
        modelCard={CharityCard}
        instances={charityInstances}
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


export default CharityModelPage;


/*
 <GenericModelPage //test
      model="Charities"
      modelCard={CharityCard}
      instances={charityData}
    />
*/