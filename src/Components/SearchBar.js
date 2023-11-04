import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function SearchBar(props) {

    const [query, setQuery] = useState(''); // Add state for the search query

    const handleSearch = () => {
      props.setSearchQuery(query); // Set the search query in the parent component
      props.onSearch(); // Trigger the search function in the parent component
    };

    return (
        <Container className='mt-4' style={{width : '35%'}}>
            <Form>
                <InputGroup className='mt-5'>
                    <Form.Control type='text' placeholder='Search for instance' value={query} onChange={(e) => setQuery(e.target.value)}/>
                    <Button variant='outline-secondary' id='button-addon1' type='submit' onClick={handleSearch}>Search</Button>
                </InputGroup>
            </Form>
        </Container>
    );
}

export default SearchBar;