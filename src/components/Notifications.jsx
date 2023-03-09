import React, { useContext, useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { SessionContext } from "../contexts/SessionContext";
import bell from "../assets/bell.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useNavigate } from "react-router-dom";
import FriendRequest from "./FriendRequest";

function Notifications() {
  const { userData } = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    if (userData && userData.username !== undefined) {
      setIsLoading(false);
    }
  }, [userData]);

  const popover = (
    <div>
      {isLoading ? (
        <></>
      ) : (
        <>
          {userData.friend_requests.length || userData.invitations.length ? (
            <Popover id="popover-basic">
              <Popover.Header as="h3">Your pending requests</Popover.Header>
              <Popover.Body>
                <ul>
                  {userData &&
                    userData.friend_requests.map((request) => (
                      <li key={request._id}>
                        <FriendRequest
                          request={request}
                          isLoading={isLoading}
                        />
                      </li>
                    ))}
                  {userData &&
                    userData.invitations.map((event) => (
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
          ) : null}
        </>
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
              {(userData && userData.friend_requests.length) ||
              (userData && userData.invitations.length) ? (
                <Badge bg="danger">
                  {userData &&
                    userData.friend_requests.length +
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
