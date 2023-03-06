import React, { useState, useContext, useEffect } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { SessionContext } from "../contexts/SessionContext";
import { Link } from "react-router-dom";
import Notifications from "./Notifications";
import "../styles/navbar.css";

function NavBarComp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useContext(SessionContext);

  useEffect(() => {
    if (userData && userData.username !== undefined) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, [userData]);

  return (
    <Navbar bg="light" variant="light" sticky="top" expand="lg">
      {isLoading ? (
        <></>
      ) : (
        <Container fluid>
          {console.log(isLoggedIn)}
          <Navbar.Brand href="#">FoodieHub</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto navItems"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                {!isLoggedIn ? (
                  <Nav.Link as={Link} to="/signup">
                    Signup
                  </Nav.Link>
                ) : (
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                )}
              </div>
              <div>
                {!isLoggedIn ? (
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                ) : (
                  <Nav.Link>
                    <Button
                      onClickCapture={() => {
                        window.localStorage.removeItem("authToken");
                      }}
                    >
                      Logout
                    </Button>
                  </Nav.Link>
                )}
                <Notifications />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      )}
    </Navbar>
  );
}

export default NavBarComp;
