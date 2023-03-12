import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Container, Card, ListGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import EventForm from "./EventForm";
import { SessionContext } from "../contexts/SessionContext";

function EventCard() {
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [isInvited, setIsInvited] = useState(false);
  const [isReplySent, setIsReplySent] = useState(false);

  const { userData, refreshData } = useContext(SessionContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/events/${id}`);
      setEvent(response.data.foundEvent);
      //   if (response.data.foundEvent.invited_users) {
      //     response.data.foundEvent.invited_users.map((user) => {
      //       if (user._id === userData._id) {
      //         setIsInvited(true);
      //       }
      //     });
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [userData]);

  useEffect(() => {
    if (event && event.title !== undefined) {
      setIsLoading(false);
    }
    event.invited_users &&
      event.invited_users.map((user) => {
        if (user._id === userData._id) {
          setIsInvited(true);
        }
      });
  }, [event]);

  const handleDelete = async (e) => {
    e.preventDefault();
    await axios.post(`${BASE_URL}/events/${event._id}/delete`);
    const response = await axios.get(`${BASE_URL}/users/${userData._id}`);
    refreshData(response.data.oneUser);
    navigate("/profile");
  };

  const handleAccept = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${BASE_URL}/users/${userData._id}/update`,
      {
        invitations: userData.invitations.filter(
          (invite) => invite._id !== event._id
        ),
        events: [event._id, ...userData.events],
      }
    );
    await axios.post(`${BASE_URL}/events/${event._id}/edit`, {
      invited_users: event.invited_users.filter(
        (req) => req._id !== userData._id
      ),
    });
    setIsReplySent(true);
    refreshData(response.data.updatedUser);
    navigate("/profile");
  };
  const handleDecline = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${BASE_URL}/users/${userData._id}/update`,
      {
        invitations: userData.invitations.filter(
          (req) => req._id !== event._id
        ),
      }
    );
    await axios.post(`${BASE_URL}/events/${event._id}/edit`, {
      invited_users: event.invited_users.filter(
        (req) => req._id !== userData._id
      ),
    });
    refreshData(response.data.updatedUser);
    setIsReplySent(true);
    navigate("/profile");
  };

  return (
    <Container>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <Card className="mt-3 restaurant-card event-card">
          <Card.Img
            variant="top"
            src={event.restaurant.image_url}
            className="card-img event-card-img"
          />

          <Card.Body className="card-body event-card-body">
            <Card.Title>
              <h2 className="card-title">{event.title}</h2>
            </Card.Title>
            <h4>Created by: {event.created_by.username}</h4>
            <h6>Date: {event.date.slice(0, 10)}</h6>
            <h6>Time: {event.time}</h6>
            <Card.Text>{event.restaurant.name}</Card.Text>
          </Card.Body>
          <ListGroup>
            <Card.Text>
              {event.restaurant.location &&
                event.restaurant.location.display_address}
            </Card.Text>
          </ListGroup>
          <Card.Body className="card-btns">
            <Button
              variant="secondary"
              onClick={() =>
                navigate(`/restaurants/profile/${event.restaurant._id}`)
              }
            >
              Restaurant details
            </Button>
            {isInvited && !isReplySent ? (
              <div className="event-res-btns">
                <Button variant="warning" onClick={handleAccept}>
                  Accept
                </Button>
                <Button variant="secondary" onClick={handleDecline}>
                  Decline
                </Button>
              </div>
            ) : null}
            {event.created_by._id === userData._id && (
              <Button
                variant="secondary"
                onClick={() => setIsEditingEvent(true)}
              >
                Edit
              </Button>
            )}
            {event.created_by._id === userData._id && (
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
      {isEditingEvent ? (
        <EventForm
          event={event}
          isEditingEvent={isEditingEvent}
          setIsEditingEvent={setIsEditingEvent}
        />
      ) : null}
    </Container>
  );
}

export default EventCard;
