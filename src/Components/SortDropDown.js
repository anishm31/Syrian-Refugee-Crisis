import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../CSS/GenericModelPage.css"
import { Form, FormControl, Button, DropdownButton, InputGroup,Dropdown } from 'react-bootstrap';
import NewsEventsInstancePage from './NewsEventsInstancePage';
import GenericModelPage from './GenericModelPage';


//props are the instances being passed in
//

function SortDropDown(props) {

  const [selectedOption, setSelectedOption] = useState(''); 

  function handleDropdownSelect(selectedKey) {
    // `selectedKey` contains the `eventKey` of the selected item
    // You can perform actions or set state based on the selected value
    console.log('Selected eventKey:', selectedKey);
  
    // Example: Set a state variable based on the selected value
    if (selectedKey === 'disaster') {
      props.onSort('date')
    } else if (selectedKey === 'theme') {
      // Handle the "Themes" selection
    } else if (selectedKey === 'source') {
      // Handle the "Source" selection
    }
  }

  return (
    
    <div className='search-and-dropdown'> 
      <InputGroup>
        <FormControl type="text" placeholder="Search" />
        <DropdownButton title="Sort" id="dropdown-menu-align-right" onSelect={handleDropdownSelect}>
          <Dropdown.Item onClick={() => props.handleSort('date')}>Date</Dropdown.Item>
          <Dropdown.Item onClick={() => props.handleSort('numThemes')}>Themes</Dropdown.Item>
          <Dropdown.Item onClick={() => props.handleSort('numSources')}>Sources</Dropdown.Item>
          <Dropdown.Item onClick={() => props.handleSort('title')}>Title</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      <p>Selected option: {selectedOption}</p>
    </div>
  );
}

export default SortDropDown;