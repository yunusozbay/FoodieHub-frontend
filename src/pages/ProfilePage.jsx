import React from "react";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
import "../styles/ProfilePage.css";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Modal, Form } from "react-bootstrap";

function ProfilePage() {
  const { userData, setUserData, isAuthenticated } = useContext(SessionContext);
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  console.log("this is userdata", userData);

  const handleUpdate = async (username, email) => {
    try {
      const response = await axios.put(
        `http://localhost:5005/profile/${userData.id}`,
        {
          username: username,
          email: email,
        }
      );
      setUserData((prevUserData) => ({
        ...prevUserData,
        username: response.data.oneUser.username,
        email: response.data.oneUser.email,
      }));
      setIsEditing(false);
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
    const response = await axios.get(
      `http://localhost:5005/users/${userData.id}`
    );
    setProfileData(response.data.oneUser);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userData && userData.username !== undefined) {
      fetchData();
    }
  }, [userData]);

  const handleDelete = async (id) => {
    await axios.post(`http://localhost:5005/restaurants/delete`, { id });
    fetchData();
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
                        src="https://source.unsplash.com/600x300/?student"
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
                  <div className="card shadow-sm my-4">
                    <div className="card-header bg-transparent border-0">
                      <h3 className="mb-0">
                        <FontAwesomeIcon icon={faCircleInfo} /> Other
                        Information
                      </h3>
                    </div>
                    <div className="card-body pt-0">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                    <Card className="mt-3 restaurant-card">
                      <Card.Img
                        variant="top"
                        src={restaurant.image_url}
                        className={isShown ? "card-img-sm" : "card-img"}
                      />
                      <Card.Body
                        className={
                          isShown
                            ? "card-body-sm d-flex flex-column justify-content-between"
                            : "card-body d-flex flex-column justify-content-between"
                        }
                      >
                        <div>
                          <p className="mb-0">
                            <h6 className="pr-1" style={{ fontSize: "1rem" }}>
                              <strong>{restaurant.name}</strong>
                            </h6>
                          </p>
                          <p className="mb-0" style={{ fontSize: "0.7rem" }}>
                            <strong className="pr-1">Phone: </strong>
                            {restaurant.phone}
                          </p>
                          <p className="mb-0" style={{ fontSize: "0.7rem" }}>
                            <strong className="pr-1">Payment currency: </strong>
                            {restaurant.price}
                          </p>
                          <p className="mb-0" style={{ fontSize: "0.7rem" }}>
                            <strong className="pr-1">Rating: </strong>
                            {restaurant.rating}
                          </p>
                          <p className="mb-0" style={{ fontSize: "0.7rem" }}>
                            <strong className="pr-1">Reviews: </strong>
                            {restaurant.reviews}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <Button
                            variant="outline-warning"
                            className="mb-2 px-0 show-details-btn"
                            style={{ padding: 0, fontSize: "0.9rem" }}
                          >
                            Show details
                          </Button>
                          <Button
                            variant="outline-warning"
                            onClick={() => handleDelete(restaurant._id)}
                            style={{ fontSize: "0.7rem" }}
                          >
                            Delete
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
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
