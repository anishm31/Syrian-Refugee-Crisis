import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../CSS/GenericModelPage.css"
import { Form, FormControl, Button, DropdownButton, InputGroup,Dropdown } from 'react-bootstrap';


function SortDropDown(props) {

  const [selectedOption, setSelectedOption] = useState(''); 

  const handleSortChange = (eventKey) => {
    if(eventKey == 'disaster')
    {
      //sort by disaster
      props.name.sort((a, b) => new Date(b.date) - new Date(a.date)); 
    }
    if(eventKey == 'theme')
    {
      //sort by theme
    }
    if(eventKey == 'source')
    {
      //sort by source
    }
    setSelectedOption(eventKey);
    
  }
  return (
    
    <div className='search-and-dropdown'> 
      <InputGroup>
        <FormControl type="text" placeholder="Search" />
        <DropdownButton title="Sort" id="dropdown-menu-align-right">
          <Dropdown.Item eventKey="disaster">Disaster</Dropdown.Item>
          <Dropdown.Item eventKey="theme">Themes</Dropdown.Item>
          <Dropdown.Item eventKey="source">Source</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      <p>Selected option: {selectedOption}</p>
    </div>
  );
}

export default SortDropDown;