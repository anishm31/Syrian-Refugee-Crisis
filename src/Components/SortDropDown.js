import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';



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
    <div> 
    <Dropdown onSelect={props.onSort}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      {selectedOption || 'Select an action'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey = "disaster">Disaster</Dropdown.Item>
        <Dropdown.Item eventKey = "theme">Themes</Dropdown.Item>
        <Dropdown.Item eventKey = "source">Source</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <p>Selected option: {selectedOption}</p>
    </div>
  );
}

export default SortDropDown;