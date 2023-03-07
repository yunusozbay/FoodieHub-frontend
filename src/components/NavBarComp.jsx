import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  ListGroup,
} from "react-bootstrap";
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

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5005/users");
    setAllUsers(response.data.allUsers);
  };

  useEffect(() => {
    if (userData && userData.username !== undefined) {
      fetchData();
      // setisAuthenticated(true);
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
            <Nav className="me-auto navItems" navbarScroll>
              <div style={{ position: "relative" }}>
                {/* <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link> */}
                {!userData ? (
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
                      <Button onClick={handleLogout}>Logout</Button>
                    </Nav.Link>
                  </>
                )}
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
                <ListGroup style={{ position: "absolute" }}>
                  {allUsers.map((user) =>
                    searchTerm &&
                    user.username !== userData.username &&
                    user.username
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ? (
                      <ListGroup.Item variant="secondary">
                        <Link key={user._id} to={`/users/${user._id}`}>
                          <div>{user.username}</div>
                        </Link>
                      </ListGroup.Item>
                    ) : null
                  )}
                </ListGroup>
              </div>
            </Nav>
          </Navbar.Collapse>
          <Notifications />
        </Container>
      )}
    </Navbar>
  );
}

export default NavBarComp;
