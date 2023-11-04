import {useState, useEffect} from "react";
import GenericModelPage from "./GenericModelPage";
import NewsCard from "./NewsCard.js";
import axios from "axios";
import "./button.css";



function NewsEventsModelPage() {
  const itemsPerPage = 12;
  const totalInstances = 75;
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [newsEventsInstances, setNewsEventsInstances] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // Add state for search results
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  const totalPages = Math.ceil(totalInstances / itemsPerPage);

  // Add a function to handle search
  const handleSearch = () => {
    axios
      .get(`https://api.syrianrefugeecrisis.me/news-and-events/search?query=${searchQuery}`)
      .then((response) => {
        setSearchResults(response.data.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the search results", error);
      });
  };

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

  // Fetch page of news/events instances from the API
  useEffect(() => {
    axios
      .get(`https://api.syrianrefugeecrisis.me/news-and-events?page=${currentPage}`)
      .then((response) => {
        setNewsEventsInstances(response.data.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log("There was an error fetching the data", error);
      });
  }, [currentPage]);

  // Verify that the charity data has been loaded before rendering main content
  if (!loaded) {
    return <h1 style={{textAlign: "center"}}>Page Loading...</h1>;
  }

  return (
    <div>
      <GenericModelPage
        model="News/Events"
        modelCard={NewsCard}
        instances={searchQuery ? searchResults : newsEventsInstances} // Use search results if a search query exists
        totalInstances={totalInstances}
        onSearch={handleSearch} // Pass the search function to the SearchBar
        setSearchQuery={setSearchQuery} // Pass setSearchQuery to the SearchBar
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
    </div>
  );
}

export default NewsEventsModelPage;