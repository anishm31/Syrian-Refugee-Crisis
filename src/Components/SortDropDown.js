import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../CSS/GenericModelPage.css";
import { Form, FormControl, DropdownButton, InputGroup, Dropdown, ButtonGroup } from 'react-bootstrap';

function SortDropDown(props) {

  const [sortingOptions, setSortingOptions] = useState([]);
  const [data, setData] = useState({}); // Initialize data as an empty object
  const [categoryLabel, setCategoryLabel] = useState("Category"); // Default label

  //default
  const [selectedFilter, setSelectedFilter] = useState({
    category: "",
    option: "",
  });


  //when the user clicks to a different Filter category
  const handleCategoryChange = (event) => {
    setSelectedFilter({
      ...selectedFilter,
      category: event.target.value,
      option: "", // Reset the option when the category changes
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
    props.handleFilter(newOption, newCategory);
  };



  //sets the variables inside of both filter and sort dropdowns
  useEffect(() => {
    // Set sorting and filtering options based on the model
    if (props.model === "News/Events") {
      setSortingOptions(['date', 'numThemes', 'numSources', 'title']);
      setCategoryLabel("Category"); // Change the label for the "News/Events" model
      setData({
        none: ['none'],
        theme: ["none",'Peacekeeping and Peacebuilding', 'Protection and Human Rights'],
        location : ["none","Syrian Arab Republic", "Occupied Palestinian Territory", "Myanmar"],
        source : ["none","SNHR", "CARE", "Concern"],
        disasterType : ["none","Epidemic", ]
      });
    } else if (props.model === 'Countries') {
      setSortingOptions(['countryName', 'totalRefugees', 'totalAsylumDecisions', 'yearOfDecisions', 'numGranted', 'numRejected']);
      setCategoryLabel("Countries"); // Change the label for the "Countries" model
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
    //sort dropdown
    <div className='search-and-dropdown'>
      <InputGroup>
        <FormControl type="text" placeholder="Search" />
        <Dropdown as={ButtonGroup}>
          <DropdownButton title="Sort" id="dropdown-menu-align-right">
            {sortingOptions.map((option) => (
              <Dropdown.Item key={option} onClick={() => props.handleSort(option)}>
                {option}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          <DropdownButton title="Filter" id="dropdown-menu-align-right" >
            <div>
              <label>{categoryLabel}:</label>
              <select value={selectedFilter.category} onChange={handleCategoryChange}>
                {Object.keys(data).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <label>Option:</label>
              <select value={selectedFilter.option} onChange={handleOptionChange}>
                {data[selectedFilter.category] && data[selectedFilter.category].map((filterSubCategory) => (
                  <option key={filterSubCategory} value={filterSubCategory} >
                    {filterSubCategory}
                  </option>
                ))}
              </select>
            </div>
          </DropdownButton>
        </Dropdown>
      </InputGroup>
    </div>
  );
}

export default SortDropDown;
