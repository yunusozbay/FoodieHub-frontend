import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router";
import EventForm from "./EventForm";

function EventCard() {
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const { id } = useParams();
  const fetchEvent = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/events/${id}`);
      console.log(response);
      setEvent(response.data.foundEvent);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

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
            <h4>with {event.invited_users}</h4>
            <h6>Date: {event.date.slice(0, 10)}</h6>
            <h6>Time: {event.time}</h6>
            <Card.Text>{event.restaurant.name}</Card.Text>
          </Card.Body>
          <ListGroup>
            <Card.Text>{event.restaurant.address.display_address}</Card.Text>
          </ListGroup>
          <Card.Body className="card-btns">
            <Button variant="secondary">See restaurant details</Button>
            <Button variant="warning" onClick={() => setIsEditingEvent(true)}>
              Edit event
            </Button>
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
