import {useState, useEffect} from "react";
import GenericModelPage from "./GenericModelPage";
import NewsCard from "./NewsCard.js";
import axios from "axios";
import "./button.css";
import SortDropDown from "./SortDropDown";


function NewsEventsModelPage() {
  const itemsPerPage = 12;
  const totalInstances = 75;
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [newsEventsInstances, setNewsEventsInstances] = useState([]);

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

  const handleSort = (sortingKey) => {
    if (sortingKey === 'disaster') {
      // Sort by disaster (you can implement the sorting logic here)
      const sortedInstances = [...newsEventsInstances].sort((a, b) => {
        const disasterA = (a.disaster && a.disaster[0]) || ''; // Get the first disaster in the list
        const disasterB = (b.disaster && b.disaster[0]) || '';
        return disasterA.localeCompare(disasterB);
      });
      setNewsEventsInstances(sortedInstances);
    setNewsEventsInstances(sortedInstances);
    } else if (sortingKey === 'theme') {
      // Sort by theme (implement sorting logic here)
    } else if (sortingKey === 'source') {
      // Sort by source (implement sorting logic here)
    }
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
        instances={newsEventsInstances}
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