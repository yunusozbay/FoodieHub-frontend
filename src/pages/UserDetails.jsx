import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { SessionContext } from "../contexts/SessionContext";
import { Button } from "react-bootstrap";
import Notifications from "../components/Notifications";

function UserDetails() {
  const [oneUser, setOneUser] = useState({});
  const [isFriend, setIsFriend] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { userData } = useContext(SessionContext);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:5005/users/${id}`);
    setOneUser(response.data.oneUser);
    setIsLoading(false);
    if (!isLoading) {
      oneUser.friends.includes(userData._id) ? setIsFriend(true) : null;
    }
  };

  const sendRequest = async () => {
    console.log(userData);
    await axios.post(`http://localhost:5005/users/${oneUser._id}/update`, {
      friend_requests: [userData.id, ...oneUser.friend_requests],
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Notifications userData={userData} />
          <h1>{oneUser.username}</h1>
          {!isFriend ? <Button onClick={sendRequest}>Add Friend</Button> : null}
        </>
      )}
    </div>
  );
}

export default UserDetails;
