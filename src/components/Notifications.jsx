import React, { useContext, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { SessionContext } from "../contexts/SessionContext";
import bell from "../assets/bell.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

function Notifications({ userData }) {
  //   const { userData } = useContext(SessionContext);
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Your pending requests</Popover.Header>
      <Popover.Body>
        <ul>
          {userData.friend_requests.map((request) => (
            <li>{request.username} has sent you a friend request</li>
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
          <Badge bg="danger">
            {userData.friend_requests.length + userData.invitations.length}
          </Badge>
          <span className="visually-hidden">unread messages</span>
        </Button>
      </OverlayTrigger>
    </>
  );
}

export default Notifications;
