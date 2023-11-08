import {useState, useEffect, useCallback} from "react";
import GenericModelPage from "./GenericModelPage";
import NewsCard from "./NewsCard.js";
import axios from "axios";
import "./button.css";

function NewsEventsModelPage({searchInput}) {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [countLoaded, setCountLoaded] = useState(false);
  const [newsEventsInstances, setNewsEventsInstances] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchInput); // State for the search query
  const [totalPages, setTotalPages] = useState(1);
  const [totalInstances, setTotalInstances] = useState(0);
  const [selectedSortOption, setSelectedSortOption] = useState("");

  const requestInstances = useCallback((userQuery, sortByKey) => {
    // Set loaded states to false
    setDataLoaded(false);
    setCountLoaded(false);
    // Define arguments for sorting/searching/filtering
    let searchArg = userQuery ? `&searchQuery=${userQuery}` : "";
    let sortByArg = sortByKey ? `&sortBy=${sortByKey}` : "";
    let sortOrderArg = ""
    if (sortByArg) {
      // Determine most logical sort order for the selected sort option
      if (sortByKey === "title") {
        sortOrderArg = "&sortOrder=asc";
      } else {
        sortOrderArg = "&sortOrder=desc";
      }
    }
    // TODO: filtering stuff
    let filterArg = "";

    let instanceCountURL = `https://api.syrianrefugeecrisis.me/news-and-events?${searchArg}${sortByArg}${sortOrderArg}${filterArg}`;
    let instanceDataURL = `https://api.syrianrefugeecrisis.me/news-and-events?${searchArg}${sortByArg}${sortOrderArg}${filterArg}&page=${currentPage}`;
    console.log("URL: ", instanceDataURL)
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
        setNewsEventsInstances(response.data.data);
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

  // useEffect for retrieving instances based on state change
  useEffect(() => {
    requestInstances(searchQuery, selectedSortOption);
  }, [requestInstances, currentPage, searchQuery, selectedSortOption]);

  return (
    <div>
      <GenericModelPage
        model="News/Events"
        modelCard={NewsCard}
        instances={newsEventsInstances} // Use search results if a search query exists
        totalInstances={totalInstances}
        handleSearch={handleSearch}
        handleSort={handleSort}
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
            id = "page-button"
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
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

export default NewsEventsModelPage;