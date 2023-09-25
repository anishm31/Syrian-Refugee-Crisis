import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function SearchBar() {
    return (
        <Container className='mt-4' style={{width : '35%'}}>
            <Form>
                <InputGroup className='mt-5'>
                    <Form.Control type='text' placeholder='Search for instance'/>
                    <Button variant='outline-secondary' id='button-addon1' type='submit'>Search</Button>
                </InputGroup>
            </Form>
        </Container>
    );
}

export default SearchBar;