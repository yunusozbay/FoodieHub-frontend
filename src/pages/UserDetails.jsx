import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { SessionContext } from "../contexts/SessionContext";
import { Button } from "react-bootstrap";
import Notifications from "../components/Notifications";
import RestaurantCard from "../components/RestaurantCard";

function UserDetails() {
  const [oneUser, setOneUser] = useState({});
  const [isFriend, setIsFriend] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const { id } = useParams();
  const { userData } = useContext(SessionContext);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:5005/users/${id}`);
    setOneUser(response.data.oneUser);
    setIsLoading(false);

    if (!isLoading) {
      oneUser.friends.includes(userData.id) ? setIsFriend(true) : null;
    }
  };

  const sendRequest = async () => {
    console.log(userData);
    await axios.post(`http://localhost:5005/users/${oneUser._id}/update`, {
      friend_requests: [userData.id, ...oneUser.friend_requests],
    });
    setIsRequestSent(true);
  };

  useEffect(() => {
    if (userData && userData.username !== undefined) {
      fetchData();
    }
  }, [userData]);

  return (
    <div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Notifications userData={userData} />
          <h1>{oneUser.username}</h1>
          {console.log(oneUser.restaurants)}
          {!isFriend ? (
            <Button
              onClick={sendRequest}
              disabled={isRequestSent ? true : false}
            >
              {isRequestSent ? "Request sent" : "Add Friend"}
            </Button>
          ) : null}
          {oneUser.restaurants.map((rest) => (
            <RestaurantCard restaurant={rest} />
          ))}
        </>
      )}
    </div>
  );
}

export default UserDetails;
