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
import EventForm from "../components/EventForm";

function ProfilePage() {
  const { userData, token, isAuthenticated, refreshData } =
    useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditingEvent, setIsEditingEvent] = useState(false);
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
      setIsEditing(false);
      refreshData(response.data.updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = () => {
    setNewUsername(userData.username);
    setNewEmail(userData.email);
    setShowModal(true);
    // console.log(profileData.username)
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    // console.log(newUsername, newEmail);
    handleUpdate(newUsername, newEmail);
    setShowModal(false);
  };

  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:5005/users/${userData._id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let parsed = await response.json();
    console.log(parsed);
    setProfileData(parsed.oneUser);
    setIsLoading(false);
  };

  useEffect(() => {
    refreshData(userData);
    if (userData && userData.username !== undefined) {
      setIsLoading(false);
    }
  }, [userData]);

  const handleEditEvent = (oneEvent) => {
    setIsEditingEvent(true);
    return (
      <EventForm
        event={event}
        isEditingEvent={isEditingEvent}
        setIsEditingEvent={setIsEditingEvent}
      />
    );
  };
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
                      <h3>Hello, {userData.username}!</h3>
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
                <div className="col-lg-8 info-card-ctn">
                  <div className="card shadow-sm info-card">
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

                              <td>{userData.username}</td>
                            </tr>
                            <tr>
                              <th width="30%">Email address:</th>

                              <td>{userData.email}</td>
                            </tr>
                            <tr>
                              <th width="30%">Joined on: </th>

                              <td>{userData.createdAt.slice(0, 10)}</td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 pt-3">
                  <ListGroup className="shadow-sm">
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
                <div className="col-lg-8 profile-ctn pt-3">
                  <h4>Upcoming events</h4>
                  <div className="col-lg-4 events-ctn">
                    <Row xs={1} md={2} lg={2} className="g-4">
                      {userData.events.map((event) => (
                        <Col key={event._id}>
                          <Card className="mt-3 profile-restaurant-card">
                            <Card.Img
                              variant="top"
                              src="https://source.unsplash.com/600x300/?food"
                              className="card-img"
                            />

                            <Card.Body className="card-body">
                              <Card.Title>
                                <h2 className="card-title">{event.title}</h2>
                              </Card.Title>
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
                                onClick={() => navigate(`/events/${event._id}`)}
                              >
                                Event details
                              </Button>
                              <Button
                                variant="secondary"
                                onClick={() => handleEditEvent(event)}
                              >
                                Edit
                              </Button>
                              {isEditingEvent ? (
                                <EventForm
                                  event={event}
                                  isEditingEvent={isEditingEvent}
                                  setIsEditingEvent={setIsEditingEvent}
                                />
                              ) : null}
                              <Button variant="danger">Delete</Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-restaurants-ctn">
            <h4>My restaurants</h4>
            <Button
              variant="warning"
              type="submit"
              onClick={() => setIsShown(!isShown)}
              className="ms-2 mb-5 mt-3"
              size="lg"
            >
              {isShown ? "Hide list" : "My list"}
            </Button>

            {isShown ? (
              <Container className="d-flex flex-wrap justify-content-center">
                <Row xs={1} md={4} lg={5} className="g-4">
                  {userData.restaurants.map((restaurant) => (
                    <Col key={restaurant._id}>
                      <RestaurantCard restaurant={restaurant} isOwner={true} />
                    </Col>
                  ))}
                </Row>
              </Container>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
