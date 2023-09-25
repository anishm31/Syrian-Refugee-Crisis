import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link } from 'react-router-dom';



function MainNavbar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary" >
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand >Syrian Regufee Crisis</Navbar.Brand>
            </LinkContainer>

            <Nav.Link>
              <Link
                style={{ color: "white", textDecoration: "inherit", marginRight: 10 }}
                to="/"
              >
              Home
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link
                style={{ color: "white", textDecoration: "inherit", marginRight: 3}}
                to="/about"
              >
              About
              </Link>
            </Nav.Link>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto"> 

                <NavDropdown title="Outreach" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Charities</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Countries
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">News/Events</NavDropdown.Item>
                </NavDropdown>
              
              </Nav>
            </Navbar.Collapse>    
          </Container>
        </Navbar>
      );
}

export default MainNavbar;