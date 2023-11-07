import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../CSS/GenericModelPage.css"
import { Form, FormControl, Button, DropdownButton, InputGroup,Dropdown } from 'react-bootstrap';
import NewsEventsInstancePage from './NewsEventsInstancePage';
import GenericModelPage from './GenericModelPage';


//props are the instances being passed in
//

function SortDropDown(props) {

  let sortingOptions  = [];

  if (props.model === "News/Events")
  {
    sortingOptions = ['date', 'numThemes', 'numSources', 'title'];
  }
  else if(props.model === 'Countries')
  {
    sortingOptions = ['countryName', 'totalRefugees', 'totalAslyumDecisions', 'yearOfDecisions', 'numGranted', "numRejected"];
  }
  else if (props.model === 'Charities')
  {
    sortingOptions = ['charityName', 'yearEstablished', 'numAwards', 'numReliefTypes'];
  }


  return (
    
    <div className='search-and-dropdown'> 
      <InputGroup>
        <FormControl type="text" placeholder="Search" />
        <DropdownButton title="Sort" id="dropdown-menu-align-right" >
          {sortingOptions.map(option => (
            <Dropdown.Item key ={option} onClick={() => props.handleSort(option)}>{option}</Dropdown.Item>
          ))}
        </DropdownButton>
      </InputGroup>
    </div>
  );
}

export default SortDropDown;