import React, { useContext, useState } from "react";
import axios from "axios";
import { SessionContext } from "../contexts/SessionContext";
import Button from "react-bootstrap/Button";

function FriendRequest({ request, isLoading }) {
  const [isReplySent, setIsReplySent] = useState(false);
  const { userData, refreshData } = useContext(SessionContext);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const sendAccept = async (request) => {
    const updatedUserData = await axios.post(
      `${BASE_URL}/users/${userData._id}/update`,
      {
        friend_requests: userData.friend_requests.filter(
          (req) => req._id !== request._id
        ),
        friends: [request._id, ...userData.friends],
      }
    );
    const updatedFriend = await axios.post(
      `${BASE_URL}/users/${request._id}/update`,
      {
        friends: [userData._id, ...request.friends],
      }
    );
    setIsReplySent(true);
    refreshData(updatedUserData.data.updatedUser);
  };
  const sendDeleteRequest = async (request) => {
    const updatedUserData = await axios.post(
      `${BASE_URL}/users/${userData._id}/update`,
      {
        friend_requests: userData.friend_requests.filter(
          (req) => req._id !== request._id
        ),
      }
    );
    setIsReplySent(true);
    refreshData(updatedUserData.data.updatedUser);
  };

  return (
    <div>
      {isLoading ? (
        <></>
      ) : (
        <>
          {request.username} has sent you a friend request
          {!isReplySent ? (
            <div>
              <Button variant="primary" onClick={() => sendAccept(request)}>
                Accept
              </Button>
              <Button
                variant="secondary"
                onClick={() => sendDeleteRequest(request)}
              >
                Delete
              </Button>
            </div>
          ) : (
            <div>Reply sent</div>
          )}
        </>
      )}
    </div>
  );
}

export default FriendRequest;
