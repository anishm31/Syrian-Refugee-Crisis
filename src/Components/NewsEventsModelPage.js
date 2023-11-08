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

  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [sortingKey, setSortingKey] = useState("");
  const totalPages = Math.ceil(totalInstances / itemsPerPage);

  const[filterItems, setFilterItems]= useState([]);
  const[newFilterItem, setNewFilterItem] = useState('');

  const filterMap = new Map();

  

  const handleSort = (sortingKey) => {
      setSortingKey(sortingKey);
      setSelectedSortOption(sortingKey);
      fetchNewsEvents(sortingKey, 1);
  };
  const handleFilter = (filterItem, mapKey) => {
    // Clone the existing filterMap to avoid modifying state directly
    const updatedFilterMap = new Map(filterMap);
    console.log("Filter Map:", filterItem, mapKey);
    // Check if the map already has the key, and add or update the value accordingly
    if (filterMap.has(mapKey)) {
      const filterList = filterMap.get(mapKey);
      filterList.push(filterItem);
      filterMap.set(mapKey, filterList);
    } else {
      filterMap.set(mapKey, [filterItem]);
    }
  
    console.log("Filter Map:", filterItem, mapKey);
    // Set the state with the updated filterMap
    setFilterItems(filterMap);
  
    // Clear the new filter item
    setNewFilterItem("");
    fetchNewsEvents(sortingKey, 1);
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
 



  const fetchNewsEvents = (sortingKey, page) => {
    const filterQuery = Array.from(filterMap.entries())
    .map(([key, values]) => `&${key}=${JSON.stringify(values)}`)
    .join('');
  
  console.log("Filter Query:", filterQuery);
    console.log("Filter mao", filterMap.entries());
    axios
      .get(`https://api.syrianrefugeecrisis.me/news-and-events?&sortBy=${sortingKey}${filterQuery}&sortOrder=asc&page=${page}`)
      //.get(`https://api.syrianrefugeecrisis.me/news-and-events?&theme=["Peacekeeping and Peacebuilding"]&page=${page}` )
      .then((response) => {
        setNewsEventsInstances(response.data.data);
        setLoaded(true);
        setCurrentPage(page);
      })
      .catch((error) => {
        console.log("There was an error fetching the data", error);
      });
  };


  // Fetch page of news/events instances from the API
  useEffect(() => {
    fetchNewsEvents(selectedSortOption, currentPage);
  }, [selectedSortOption, currentPage]);
  //   axios
  //     .get(`https://api.syrianrefugeecrisis.me/news-and-events?page=${currentPage}`)
  //     .then((response) => {
  //       setNewsEventsInstances(response.data.data);
  //       setLoaded(true);
  //     })
  //     .catch((error) => {
  //       console.log("There was an error fetching the data", error);
  //     });
  // }, [currentPage]);


  //add this back in later
  // // Verify that the charity data has been loaded before rendering main content
  // if (!loaded) {
  //   return <h1 style={{textAlign: "center"}}>Page Loading...</h1>;
  // }



  return (
    <div>

      <GenericModelPage
        model="News/Events"
        modelCard={NewsCard}
        instances={newsEventsInstances}
        totalInstances={totalInstances}
        handleSort = {handleSort}
        handleFilter = {handleFilter}

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