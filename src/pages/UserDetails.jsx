import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { SessionContext } from "../contexts/SessionContext";
import { Button } from "react-bootstrap";
import RestaurantCard from "../components/RestaurantCard";

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
    // setIsLoading(false);

    // response.data.oneUser.friends.includes(userData._id)
    //   ? setIsFriend(true)
    //   : null;
  };

  const sendRequest = async () => {
    console.log(userData);
    const updatedFriend = await axios.post(
      `${BASE_URL}/users/${oneUser._id}/update`,
      {
        friend_requests: [userData._id, ...oneUser.friend_requests],
      }
    );
    const response = await axios.post(
      `${BASE_URL}/users/${userData._id}/update`
      // {
      //   friend_requests_sent: [oneUser._id, ...userData.friend_requests_sent],
      // }
    );
    setIsRequestSent(true);
    refreshData(response.data.updatedUser);
  };

  useEffect(() => {
    // refreshData(userData);
    if (userData && userData.username !== undefined) {
      fetchData();
      setIsLoading(false);
      // oneUser.friends.includes(userData._id) ? setIsFriend(true) : null;
    }
  }, [userData]);

  useEffect(() => {
    // refreshData(userData);
    if (oneUser && oneUser.username !== undefined) {
      oneUser.friends.includes(userData._id) ? setIsFriend(true) : null;
    }
  }, [oneUser]);

  return (
    <div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
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
          {/* {isFriend
            ? oneUser.restaurants.map((rest) => <p>Restaurants</p>)
            : null} */}
          {isFriend && <p>Restaurants</p>}
        </>
      )}
    </div>
  );
}

export default UserDetails;
