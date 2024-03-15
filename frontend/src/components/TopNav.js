import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaUserCircle, FaChartLine } from 'react-icons/fa';

const TopNav = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ marginBottom: '20px', padding: '10px 0' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="me-auto text-white d-flex align-items-center">
          <FaChartLine className="me-2" />Evaluation Dashboard
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="text-white d-flex align-items-center me-3">
              <FaHome className="me-2" />Home
            </Nav.Link>
            <Nav.Link className="text-white d-flex align-items-center">
              <FaUserCircle className="me-2" />Ganesh
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNav;
