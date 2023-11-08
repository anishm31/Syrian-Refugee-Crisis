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
  const [searchQuery, setSearchQuery] = useState(searchInput);
  const [totalPages, setTotalPages] = useState(1);
  const [totalInstances, setTotalInstances] = useState(0);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [filterItems, setFilterItems] = useState([]);
  const filterMap = new Map();

  const requestInstances = useCallback((userQuery, sortByKey, filterOptionsMap) => {
    // Set loaded states to false
    setDataLoaded(false);
    setCountLoaded(false);
    // Define arguments for sorting/searching/filtering
    let searchArg = userQuery ? `&searchQuery=${userQuery}` : "";
    let sortByArg = sortByKey ? `&sortBy=${sortByKey}` : "";
    let sortOrderArg = ""
    if (sortByArg) {
      // Determine most logical sort order for the selected sort option
      if (sortByKey === "countryName") {
        sortOrderArg = "&sortOrder=asc";
      } else {
        sortOrderArg = "&sortOrder=desc";
      }
    }
    let filterArg = filterOptionsMap ? 
                    Array.from(filterOptionsMap.entries()) 
                    .map(([key, values]) => `&${key}=${JSON.stringify(values)}`)
                    .join('')
                    : "";
    
    let instanceCountURL = `https://api.syrianrefugeecrisis.me/countries?${searchArg}${sortByArg}${sortOrderArg}${filterArg}`;
    let instanceDataURL = `https://api.syrianrefugeecrisis.me/countries?${searchArg}${sortByArg}${sortOrderArg}${filterArg}&page=${currentPage}`;
    console.log("URL", instanceDataURL)
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

  const handleFilter = (filterValue, filterKey) => {
    if (filterValue === "none") {
      filterValue = "";
    }
    // Check if the map already has the key, and add or update the value accordingly
    if (filterMap.has(filterKey)) {
      let filterList = filterMap.get(filterKey);
      // Now, check if filterList already includes the filterValue
      if (filterList.includes(filterValue)) {
        // User added filter value twice, get rid of it from filter list
        const filterListCopy = filterList.filter((item)=> item !== filterValue);
        filterList = filterListCopy;
      } else {
        filterList.push(filterValue);
        filterMap.set(filterKey, filterList);
      }
    } else {
      filterMap.set(filterKey, [filterValue]);
    }

    // Set state with update filterMap to trigger useEffect
    setFilterItems(filterMap);
    setCurrentPage(1);
  };

  const handleSort = (sortingKey) => {
    // Change in state will trigger useEffect
    setSelectedSortOption(sortingKey);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    // Change in state will trigger useEffect
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // useEffect for retrieving instances based on state changes
  useEffect(() => {
    requestInstances(searchQuery, selectedSortOption, filterItems);
  }, [requestInstances, currentPage, searchQuery, selectedSortOption, filterItems]);

  // Instance data loaded, render main content
  return (
    <div>
      <GenericModelPage
        model="Countries"
        modelCard={CountryCard}
        instances={countryInstances}
        totalInstances={totalInstances}
        handleSearch={handleSearch} // Pass handleSearch to the SearchBar
        handleSort={handleSort}
        handleFilter={handleFilter}
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
