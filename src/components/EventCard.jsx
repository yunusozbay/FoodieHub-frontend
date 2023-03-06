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

  const { userData } = useContext(SessionContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/events/${id}`);
      setEvent(response.data.foundEvent);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const handleDelete = async () => {
    await axios.post(`http://localhost:5005/events/${event._id}/delete`);
    navigate("/profile");
  };

  return (
    <Container>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <Card className="mt-3 restaurant-card">
          <Card.Img
            variant="top"
            src={event.restaurant.image_url}
            className="card-img"
          />

          <Card.Body className="card-body">
            <Card.Title>
              <h2 className="card-title">{event.title}</h2>
            </Card.Title>
            with{" "}
            {event.invited_users.map((friend) => (
              <span>{friend.username}</span>
            ))}
            <h4>Created by: {event.created_by.username}</h4>
            <h6>Date: {event.date.slice(0, 10)}</h6>
            <h6>Time: {event.time}</h6>
            <Card.Text>{event.restaurant.name}</Card.Text>
          </Card.Body>
          <ListGroup>
            <Card.Text>{event.restaurant.address.display_address}</Card.Text>
          </ListGroup>
          <Card.Body className="card-btns">
            <Button
              variant="secondary"
              onClick={() => navigate(`/restaurants/${event.restaurant.alias}`)}
            >
              Restaurant details
            </Button>
            {event.created_by._id === userData.id && (
              <Button
                variant="secondary"
                onClick={() => setIsEditingEvent(true)}
              >
                Edit
              </Button>
            )}
            {event.created_by._id === userData.id && (
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
