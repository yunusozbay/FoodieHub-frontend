import React, { useContext, useState, useEffect } from "react";
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
  const [isReplySent, setIsReplySent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const sendAccept = async (request) => {
    const updatedUser = await axios.post(
      `http://localhost:5005/users/${userData.id}/update`,
      {
        friend_requests: userData.friend_requests.filter(
          (req) => req._id !== request._id
        ),
        friends: [request._id, ...userData.friends],
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
  const sendDeleteRequest = async (request) => {
    const updatedUser = await axios.post(
      `http://localhost:5005/users/${userData.id}/update`,
      {
        friend_requests: userData.friend_requests.filter(
          (req) => req._id !== request._id
        ),
      }
    );
    setIsReplySent(true);
  };

  useEffect(() => {
    if (userData && userData.username !== undefined) {
      setIsLoading(false);
    }
  }, [userData]);

  const popover = (
    <div>
      {isLoading ? (
        <></>
      ) : (
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
                        onClick={() => sendAccept(request)}
                      >
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
      )}
    </div>
  );
  return (
    <div>
      {isLoading ? (
        <></>
      ) : (
        <>
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <Button variant="secondary">
              <img style={{ width: "1.2rem" }} src={bell} />
              {userData.friend_requests.length ||
              userData.invitations.length ? (
                <Badge bg="danger">
                  {userData.friend_requests.length +
                    userData.invitations.length}
                </Badge>
              ) : null}
              <span className="visually-hidden">unread messages</span>
            </Button>
          </OverlayTrigger>
        </>
      )}
    </div>
  );
}

export default Notifications;
