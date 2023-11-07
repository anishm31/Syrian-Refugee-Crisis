import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../CSS/GenericModelPage.css";
import { Form, FormControl, Button, DropdownButton, InputGroup, Dropdown, ButtonGroup } from 'react-bootstrap';
import NewsEventsModelPage from './NewsEventsModelPage';


function SortDropDown(props) {
  let sortingOptions = [];
  const [showConnectedDropdown, setShowConnectedDropdown] = useState(false);
  const [filteringOptions, setFilteringOptions] = useState({});
  const [selectedFilter, setSelectedFilter] = useState(null);

  const toggleConnected = (val) => {
    setShowConnectedDropdown(val);
  };

    const handleFilterSelection = (option) => {
    setSelectedFilter(option);
  };
  function getKeyByValue(object, value) {
    for (const key in object) {
      const keyList = object[key];
      if (keyList.includes(value)) {
        return key;
      }
    }
    return null; // Return null if the value is not found in the object
  }

  const menuItems = [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'Services',
      url: '/services',
    },
    {
      title: 'About',
      url: '/about',
    },
  ];

  // Set sort choices based on the model that the dropdown box will be in
  if (props.model === "News/Events") {
    sortingOptions = ['date', 'numThemes', 'numSources', 'title'];
  } else if (props.model === 'Countries') {
    sortingOptions = ['countryName', 'totalRefugees', 'totalAsylumDecisions', 'yearOfDecisions', 'numGranted', "numRejected"];
  } else if (props.model === 'Charities') {
    sortingOptions = ['charityName', 'yearEstablished', 'numAwards', 'numReliefTypes'];
  }

  // Set the filtering choices based on the model that the dropdown box will be in
  useEffect(() => {
    if (props.model === 'Countries') {
      setFilteringOptions({
        location: ['China', 'Yemen', 'Mexico'],
      });
    }
    else if (props.model === 'News/Events')
    {
      setFilteringOptions({
        themes: ['Peacekeeping and Peacebuilding', 'Protection and Human Rights'],
      });
    }
    else if(props.model === 'Charities')
    {
      setFilteringOptions({
        orgType: ['Non-governmental Organization', 'International Organization'],
      });
    }
  }, [props.model]);

  return (
    <div className='search-and-dropdown'>
      <InputGroup>
        <FormControl type="text" placeholder="Search" />
        <Dropdown as={ButtonGroup}>
          <DropdownButton title="Sort" id="dropdown-menu-align-right">
            {sortingOptions.map(option => (
              <Dropdown.Item key={option} onClick={() => props.handleSort(option)}>
                {option}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          <DropdownButton onClick={() => toggleConnected(true)} title="Filter" id="dropdown-menu-align-right">
          {menuItems.map((menu, index) => {
          return (
            <li className="menu-items" key={index}>
              <a>{menu.title}</a>
              <Dropdown as={ButtonGroup}>
              <DropdownButton title={menu.title} id="dropdown-menu-align-right">
             {sortingOptions.map(option => (
              <Dropdown.Item key={option} onClick={() => props.handleSort(option)}>
                {option}
              </Dropdown.Item>
            ))}
          </DropdownButton>
              </Dropdown>
            </li>
          );
        })}
        </DropdownButton>
        </Dropdown>
      </InputGroup>
    </div>
  );
}

export default SortDropDown;
