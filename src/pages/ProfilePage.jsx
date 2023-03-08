import React from "react";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
import "../styles/ProfilePage.css";
import { Card, ListGroup, Button, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Modal, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";

function ProfilePage() {
  const { userData, token, isAuthenticated, refreshData } =
    useContext(SessionContext);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  console.log("this is userdata", userData);

  const handleUpdate = async (username, email) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/${userData._id}/update`,
        {
          username: username,
          email: email,
        }
      );
      // setUserData((prevUserData) => ({
      //   ...prevUserData,
      //   username: response.data.oneUser.username,
      //   email: response.data.oneUser.email,
      // }));
      setIsEditing(false);
      refreshData(response.data.updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = () => {
    setNewUsername(profileData.username);
    setNewEmail(profileData.email);
    setShowModal(true);
    // console.log(profileData.username)
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    console.log(newUsername, newEmail);
    handleUpdate(newUsername, newEmail);
    setShowModal(false);
  };

  const fetchData = async () => {
    const response = await fetch(`${BASE_URL}/users/${userData._id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let parsed = await response.json();
    console.log(parsed);
    setProfileData(parsed.oneUser);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userData && userData.username !== undefined) {
      fetchData();
    }
  }, [userData]);

  // const handleDelete = async (id) => {
  //   await axios.post(`${BASE_URL}/restaurants/delete`, { id });
  //   fetchData();
  // };

  return (
    <div className="container">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          {/* {console.log(profileData)} */}
          {/* <h1>{profileData.username}</h1> */}

          <div className="user-profile py-4 mb-4">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="card shadow-sm ">
                    <div className="card-header bg-transparent text-center">
                      <img
                        className="profile_img"
                        src="https://source.unsplash.com/600x300/?food"
                        alt="student dp"
                      />
                      <h3>Hello, {profileData.username}!</h3>
                    </div>
                    <div className="card-body">
                      <p className="mb-0">
                        <strong className="pr-1">Friends: </strong>3
                      </p>
                      <p className="mb-0">
                        <strong className="pr-1">Favorite restaurants: </strong>
                        4
                      </p>
                      <p className="mb-0">
                        <strong className="pr-1">Events organized: </strong>2
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="card shadow-sm">
                    <div className="card-header bg-transparent border-0 d-flex align-items-center justify-content-between">
                      <h3 className="mb-0">
                        <FontAwesomeIcon icon={faCircleInfo} /> General
                        Information
                      </h3>
                      {isAuthenticated && !isEditing && (
                        <Button
                          variant="outline-primary"
                          type="button"
                          onClick={handleEditClick}
                        >
                          Edit
                        </Button>
                      )}
                      <Modal show={showModal} onHide={handleModalClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Edit Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <form onSubmit={handleUpdate}>
                            <div className="mb-3">
                              <label htmlFor="username" className="form-label">
                                Username
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                Email address
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn btn-primary me-2"
                              onClick={handleSaveClick}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={handleModalClose}
                            >
                              Cancel
                            </button>
                          </form>
                        </Modal.Body>
                      </Modal>
                    </div>
                    <div className="card-body pt-0">
                      {isEditing ? (
                        <form onSubmit={handleUpdate}>
                          <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                              Username
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="username"
                              value={newUsername}
                              onChange={(e) => setNewUsername(e.target.value)}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                              Email address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary me-2"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </button>
                        </form>
                      ) : (
                        <table className="table table-bordered">
                          <tbody>
                            <tr>
                              <th width="30%">Username: </th>

                              <td>{profileData.username}</td>
                            </tr>
                            <tr>
                              <th width="30%">Email address:</th>

                              <td>{profileData.email}</td>
                            </tr>
                            <tr>
                              <th width="30%">Joined on: </th>

                              <td>{profileData.createdAt.slice(0, 10)}</td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <ListGroup>
                    <ListGroup.Item>
                      <h4>My Foodie Friends</h4>
                    </ListGroup.Item>
                    {userData.friends.map((friend) => (
                      <ListGroup.Item>
                        <Link to={`/users/${friend._id}`}>
                          <h5>{friend.username}</h5>
                        </Link>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
                <div>
                  <h4>Upcoming events</h4>
                  {userData.events.map((event) => (
                    <Card className="mt-3 restaurant-card">
                      <Card.Img
                        variant="top"
                        src={event.restaurant.image_url}
                        className="card-img"
                      />

                      <Card.Body className="card-body">
                        <Card.Title>
                          <h2 className="card-title">{event.title}</h2>
                        </Card.Title>
                        with{" "}
                        {event.invited_users.map((friend) => (
                          <span>{friend.username}</span>
                        ))}
                        <h4>Created by: {event.created_by.username}</h4>
                        <h6>Date: {event.date.slice(0, 10)}</h6>
                        <h6>Time: {event.time}</h6>
                        <Card.Text>{event.restaurant.name}</Card.Text>
                      </Card.Body>
                      <ListGroup>
                        <Card.Text>
                          {event.restaurant.location &&
                            event.restaurant.location.display_address}
                        </Card.Text>
                      </ListGroup>
                      <Card.Body className="card-btns">
                        <Button
                          variant="secondary"
                          onClick={() =>
                            navigate(`/restaurants/${event.restaurant.alias}`)
                          }
                        >
                          Restaurant details
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setIsEditingEvent(true)}
                        >
                          Edit
                        </Button>
                        <Button variant="danger">Delete</Button>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <h6>My favourite restaurants</h6>
          <Button
            variant="outline-warning"
            type="submit"
            onClick={() => setIsShown(!isShown)}
            className="ms-2 mb-5"
          >
            {isShown ? "Hide list" : "My list"}
          </Button>

          {isShown ? (
            <Container className="d-flex flex-wrap justify-content-center">
              <Row xs={1} md={4} lg={5} className="g-4">
                {profileData.restaurants.map((restaurant) => (
                  <Col key={restaurant._id}>
                    <RestaurantCard restaurant={restaurant} isOwner={true} />
                  </Col>
                ))}
              </Row>
            </Container>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

export default ProfilePage;
