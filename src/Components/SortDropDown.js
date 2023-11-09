import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
// TODO: Do we need this import? Causing JEST to fail
// import 'bootstrap/dist/css/bootstrap.min.css';

function SortDropDown(props) {

  const [sortingOptions, setSortingOptions] = useState([]);
  const [data, setData] = useState({}); 
  const [categoryLabel, setCategoryLabel] = useState("Category"); // Default label

  // default
  const [selectedFilter, setSelectedFilter] = useState({
    category: "",
    option: "",
  });

  //when the user clicks to a different Filter category
  const handleCategoryChange = (event) => {
    setSelectedFilter({
      ...selectedFilter,
      category: event.target.value,
      // Reset the option when the category changes
      option: "", 
    });
  };

  //when the user switches to a different subcategory
  const handleOptionChange = (event) => {
    const newCategory = selectedFilter.category;
    const newOption = event.target.value;
      setSelectedFilter({
        ...selectedFilter,
        option: event.target.value,
      });

    // Call props.handleFilter with the selected category and option
    console.log("newOption: " + newOption + " newCategory: " + newCategory)
    props.handleFilter(newOption, newCategory);
};

//sets the variables inside of both filter and sort dropdowns
useEffect(() => {
  // Set sorting and filtering options based on the model
  if (props.model === "News/Events") {
    setSortingOptions(['date', 'numThemes', 'numSources', 'title']);
    setCategoryLabel("Category"); 
    setData({
      none: ['none'],
      theme: ["none",'Peacekeeping and Peacebuilding', 'Protection and Human Rights'],
      location : ["none","Syrian Arab Republic", "Occupied Palestinian Territory", "Myanmar"],
      source : ["none","SNHR", "CARE", "Concern"],
      disasterType : ["none","Epidemic", ]
    });
  } else if (props.model === 'Countries') {
    setSortingOptions(['countryName', 'totalRefugees', 'totalAsylumDecisions', 'yearOfDecisions', 'numGranted', 'numRejected']);
    setCategoryLabel("Countries"); 
    setData({
      none: ['none'],
      year: ["none",2015, 2020, 2019],
      numRefugees: ["none",23, 7803, 450]
    });
  } else if (props.model === 'Charities') {
    setSortingOptions(['charityName', 'yearEstablished', 'numAwards', 'numReliefTypes']);
    setCategoryLabel("Charity Filters");
    setData({
      none: ['none'],
      orgType: ["none","Non-governmental Organization", "Government"],
      hqCountry : ["none",'France','Switzerland', 'Denmark'],
      reliefTypes : ["none","Basic Needs", "Education",
      "Food Security"]
    });
  }
}, [props.model]);

  return (
    <div className="search-and-dropdown">
      {/*Sort Dropdown Menu*/}
      <Dropdown as={ButtonGroup}>
        <DropdownButton title="Sort" id="dropdown-menu-align-right">
          {sortingOptions.map((option) => (
            <Dropdown.Item
              key={option}
              onClick={() => props.handleSort(option)}
            >
              {option}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        {/*Filter Dropdown Menu*/}
        <DropdownButton title="Filter" id="dropdown-menu-align-right">
          <div>
            <label>{categoryLabel}:</label>
            <select
              value={selectedFilter.category}
              onChange={handleCategoryChange}
            >
              {/*map the sort categories in first dropdown*/}
              {Object.keys(data).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <label>Option:</label>
            <select value={selectedFilter.option} onChange={handleOptionChange}>
              {data[selectedFilter.category] &&
                data[selectedFilter.category].map((filterSubCategory) => (
                  <option key={filterSubCategory} value={filterSubCategory}>
                    {filterSubCategory}
                  </option>
                ))}
            </select>
          </div>
        </DropdownButton>
      </Dropdown>
    </div>
  );
}

export default SortDropDown;
