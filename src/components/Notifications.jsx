import React, { useContext, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { SessionContext } from "../contexts/SessionContext";
import bell from "../assets/bell.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const { userData } = useContext(SessionContext);
  const [friendRequests, setFriendRequests] = useState(
    userData.friend_requests
  );
  const [friends, setFriends] = useState(userData.friends);
  const [isReplySent, setIsReplySent] = useState(false);

  const navigate = useNavigate();

  const sendResponse = async (request) => {
    const updatedUser = await axios.post(
      `http://localhost:5005/users/${userData.id}/update`,
      {
        friend_requests: friendRequests,
        friends: friends,
      }
    );
    const updatedFriend = await axios.post(
      `http://localhost:5005/users/${request._id}/update`,
      {
        friends: [userData.id, ...request.friends],
      }
    );
    setIsReplySent(true);
  };

  const handleDeleteRequest = (request) => {
    const newArr = JSON.parse(JSON.stringify(friendRequests));
    const index = newArr.indexOf(request._id);
    newArr.splice(index, 1);
    let requestIds = [];
    newArr.map((req) => {
      requestIds.push(req._id);
    });
    setFriendRequests(requestIds);
    sendResponse(request);
  };

  const handleAccept = (request) => {
    let newFriendsArr = [...friends];
    newFriendsArr.unshift(request._id);
    setFriends(newFriendsArr);
    const newArr = JSON.parse(JSON.stringify(friendRequests));
    const index = newArr.indexOf(request._id);
    newArr.splice(index, 1);
    let requestIds = [];
    newArr.map((req) => {
      requestIds.push(req._id);
    });
    setFriendRequests(requestIds);
    // handleDeleteRequest(request);
    sendResponse(request);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Your pending requests</Popover.Header>
      <Popover.Body>
        <ul>
          {userData.friend_requests.map((request) => (
            <li key={request._id}>
              {request.username} has sent you a friend request
              {!isReplySent ? (
                <div>
                  <Button
                    variant="primary"
                    onClick={() => handleAccept(request)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleDeleteRequest(request)}
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                <div>Reply sent</div>
              )}
            </li>
          ))}
          {userData.invitations.map((event) => (
            <li key={event._id}>
              You've been invited to "{event.title}"
              <div>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/events/${event._id}`)}
                >
                  See details
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Popover.Body>
    </Popover>
  );
  console.log(userData);
  return (
    <>
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <Button variant="secondary">
          <img style={{ width: "1.5rem" }} src={bell} />
          {userData.friend_requests.length || userData.invitations.length ? (
            <Badge bg="danger">
              {userData.friend_requests.length + userData.invitations.length}
            </Badge>
          ) : null}
          <span className="visually-hidden">unread messages</span>
        </Button>
      </OverlayTrigger>
    </>
  );
}

export default Notifications;
