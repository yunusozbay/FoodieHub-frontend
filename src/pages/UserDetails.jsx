import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { SessionContext } from "../contexts/SessionContext";
import { Button } from "react-bootstrap";
import RestaurantCard from "../components/RestaurantCard";
import { Container, Row, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/ProfilePage.css";

function UserDetails() {
  const [oneUser, setOneUser] = useState({});
  const [isFriend, setIsFriend] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const { id } = useParams();
  const { userData, refreshData } = useContext(SessionContext);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchData = async () => {
    const response = await axios.get(`${BASE_URL}/users/${id}/details`);
    setOneUser(response.data.oneUser);
  };

  const sendRequest = async () => {
    const updatedFriend = await axios.post(
      `${BASE_URL}/users/${oneUser._id}/update`,
      {
        friend_requests: [userData._id, ...oneUser.friend_requests],
      }
    );
    const response = await axios.post(
      `${BASE_URL}/users/${userData._id}/update`
    );
    setIsRequestSent(true);
    refreshData(response.data.updatedUser);
  };

  useEffect(() => {
    if (userData && userData.username !== undefined) {
      fetchData();
      setIsLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    if (oneUser && oneUser.username !== undefined) {
      oneUser.friends.map((friend) => {
        if (friend._id === userData._id) {
          setIsFriend(true);
        }
      });
    }
  }, [oneUser]);

  return (
    <div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <Container>
          <div className="row">
            <div className="col-lg-4">
              <div className="card shadow-sm ">
                <div className="card-header bg-transparent text-center">
                  <img
                    className="profile_img"
                    src={
                      oneUser.image_url
                        ? oneUser.image_url
                        : "https://source.unsplash.com/600x300/?food"
                    }
                    alt="food dp"
                  />
                  <h1>{oneUser.username}</h1>
                  {!isFriend ? (
                    <Button
                      onClick={sendRequest}
                      disabled={isRequestSent ? true : false}
                    >
                      {isRequestSent ? "Request sent" : "Add Friend"}
                    </Button>
                  ) : null}
                </div>
                <div className="card-body">
                  <p className="mb-0">
                    <strong className="pr-1">Friends: </strong>
                    {oneUser.friends && oneUser.friends.length}
                  </p>
                  <p className="mb-0">
                    <strong className="pr-1">Saved restaurants: </strong>
                    {oneUser.restaurants && oneUser.restaurants.length}
                  </p>
                  <p>
                    <strong className="pr-1">Joined on: </strong>
                    {oneUser.createdAt && oneUser.createdAt.slice(0, 10)}
                  </p>
                </div>
                <div className="my-restaurants-ctn pt-3">
                  <ListGroup className="shadow-sm">
                    <ListGroup.Item>
                      <h4>Foodie Friends</h4>
                    </ListGroup.Item>
                    {oneUser.friends &&
                      oneUser.friends.map((friend) => (
                        <ListGroup.Item key={friend._id}>
                          <Link
                            className="friends-list-item"
                            to={`/users/${friend._id}`}
                          >
                            <img
                              className="profile_img friends-list-img"
                              src={
                                friend.image_url
                                  ? friend.image_url
                                  : "https://source.unsplash.com/600x300/?food"
                              }
                              alt="profile dp"
                            />
                            <div className="friends-list-info">
                              <h5 className="friends-list-name mb-0">
                                {friend.username}
                              </h5>
                              <p>{friend.restaurants.length} restaurants</p>
                            </div>
                          </Link>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </div>
              </div>
            </div>
            <div className="col-lg-8 rest-card-ctn">
              <div className="card shadow-sm rest-card">
                <h4 className="m-3">Restaurants</h4>
                <Container>
                  <Row xs={1} md={2} lg={3} className="g-4">
                    {oneUser.restaurants && oneUser.restaurants.length ? (
                      oneUser.restaurants.map((rest) => (
                        <RestaurantCard key={rest._id} restaurant={rest} />
                      ))
                    ) : (
                      <p>
                        {oneUser.username} hasn't added any restaurants to their
                        collection yet.
                      </p>
                    )}
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}

export default UserDetails;
