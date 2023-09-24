import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import About from './About.js';



function MainNavbar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary" >
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand >Syrian Regufee Crisis</Navbar.Brand>
            </LinkContainer>

            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/about">
              <Nav.Link >About</Nav.Link>
            </LinkContainer>
            
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