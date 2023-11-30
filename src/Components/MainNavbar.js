import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function MainNavbar() {
  const onSearch = (e) => {
    e.preventDefault();
    var searchedTerm = document.getElementById("searchText").value;
    if (searchedTerm) {
      window.location.assign(`/search/${searchedTerm}`)
    }
  }

    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary" >
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand >Syrian Refugee Crisis</Navbar.Brand>
            </LinkContainer>

            <Nav.Link>
              <Link
                style={{ color: "white", textDecoration: "inherit", marginRight: 14 }}
                to="/"
              >
              Home
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link
                style={{ color: "white", textDecoration: "inherit", marginRight: 14}}
                to="/about"
              >
              About
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link
                style={{ color: "white", textDecoration: "inherit", marginRight: 14}}
                to="/timeline"
              >
              Timeline
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link
                style={{ color: "white", textDecoration: "inherit", marginRight: 14}}
                to="/visualizations"
              >
                Visualizations
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link
                style={{ color: "white", textDecoration: "inherit", marginRight: 14}}
                to="/provider-visualizations"
              >
                Provider Visualizations
              </Link>
            </Nav.Link>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto"> 
                <NavDropdown title="Outreach" id="basic-nav-dropdown">

                  <NavDropdown.Item>
                    <Link
                      style={{ color: "white", textDecoration: "inherit"}}
                      to="/charities"
                    >
                      Charities
                    </Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link
                      style={{ color: "white", textDecoration: "inherit"}}
                      to="/countries"
                    >
                      Countries
                    </Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link
                      style={{ color: "white", textDecoration: "inherit"}}
                      to="/news-and-events"
                    >
                      News/Events
                    </Link>
                  </NavDropdown.Item>

                </NavDropdown>
              </Nav>
            </Navbar.Collapse>   
            <Form className="d-flex justify-content-end" onSubmit={onSearch}>
              <Form.Control type="search" id="searchText" placeholder="Search..." 
                  className="mx-2" aria-label="Search"></Form.Control>
              <Button type="submit" variant="dark">Search</Button>
            </Form>
          </Container>
        </Navbar>
      );
}

export default MainNavbar;