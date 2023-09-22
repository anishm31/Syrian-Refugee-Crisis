import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MainNavbar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary" >
          <Container>
            <Navbar.Brand href="#home">Syrian Regufee Crisis</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">About</Nav.Link>
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