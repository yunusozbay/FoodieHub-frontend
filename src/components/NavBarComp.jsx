import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NavBarComp() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto justify-content-center align-items-center"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Form className="d-flex flex-grow-1">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>

            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/profile'>Profile</Nav.Link>

            <Nav.Link as={Link} to='/login'>Login</Nav.Link>

            <Nav.Link as={Link} to='/logout'>Logout</Nav.Link>
          </Nav><Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  
}

export default NavBarComp;