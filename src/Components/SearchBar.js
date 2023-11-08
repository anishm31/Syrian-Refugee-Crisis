import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import SortDropDown from './SortDropDown';

function SearchBar(props) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    props.handleSearch(query)
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      handleSearch(); // Trigger search when the "Enter" key is pressed
    }
  };

  return (
    <Container className='mt-4' style={{ width: '35%' }}>
      <Form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission */}
        <InputGroup className='mt-5'>
          <Form.Control
            type='text'
            placeholder='Search for instance'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress} // Detect "Enter" key press
          />
          <Button
            variant='outline-secondary'
            id='button-addon1'
            type='button'
            onClick={handleSearch}
          >
            Search
          </Button>
          <SortDropDown 
            className="sort-drop-down" 
            name={props.name} 
            handleSort={props.handleSort} 
            align-items="center" 
            model ={props.model} 
            handleFilter={props.handleFilter}>
          </SortDropDown>
        </InputGroup>
      </Form>
    </Container>
  );
}

export default SearchBar;
