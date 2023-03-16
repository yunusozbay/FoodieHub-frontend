import React, { useState, useContext, useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { SessionContext } from "../contexts/SessionContext";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "./Notifications";
import "../styles/navbar.css";
import SearchBar from "./SearchBar";
import axios from "axios";

function NavBarComp() {
  const [isLoading, setIsLoading] = useState(true);
  const { userData, handleLogout, isAuthenticated } =
    useContext(SessionContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    setAllUsers(response.data.allUsers);
  };

  useEffect(() => {
    if (userData && userData.username !== undefined) {
      fetchData();
      setSearchTerm("");
    }
    setIsLoading(false);
  }, [userData]);

  return (
    <Navbar bg="light" variant="light" sticky="top" expand="lg">
      {isLoading ? (
        <></>
      ) : (
        <Container fluid>
          <Nav>
            <Navbar.Brand as={Link} to="/">
              FoodieHub
            </Navbar.Brand>
          </Nav>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto navItems">
              <div style={{ position: "relative" }}>
                {!isAuthenticated ? (
                  <>
                    <Nav.Link as={Link} to="/signup">
                      Signup
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/profile">
                      Profile
                    </Nav.Link>
                    <Nav.Link>
                      <Button
                        variant="outline-secondary"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Nav.Link>
                  </>
                )}
                {isAuthenticated && (
                  <div className="search">
                    <SearchBar
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />
                    <div className="search-results">
                      {allUsers.map((user) =>
                        searchTerm &&
                        user.username !== userData.username &&
                        user.username
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ? (
                          <button
                            onClick={(event) => {
                              setSearchTerm("");
                              event.preventDefault();
                              navigate(`/users/${user._id}`);
                            }}
                            key={user._id}
                          >
                            <div>{user.username}</div>
                          </button>
                        ) : null
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
          {isAuthenticated && <Notifications />}
        </Container>
      )}
    </Navbar>
  );
}

export default NavBarComp;
