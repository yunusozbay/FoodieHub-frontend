import React, { useContext, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import EventForm from "./EventForm";
import axios from "axios";
import { SessionContext } from "../contexts/SessionContext";

function RestaurantCard({ restaurant, listView }) {
  const [hidden, setHidden] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const { userData } = useContext(SessionContext);
  async function handlePost() {
    await axios.post("http://localhost:5005/api/add", {
      userData,
      restaurant,
    });
    setHidden(true);
    console.log(userData);
  }
  const navigate = useNavigate();
  return (
    <div>
      <Card className="mt-3 restaurant-card">
        <Link to={`/restaurants/${restaurant.id}`}>
          <Card.Img
            variant="top"
            src={restaurant.image_url}
            className={listView ? "card-img-sm" : "card-img"}
          />
        </Link>
        <Card.Body className={listView ? "card-body-sm" : "card-body"}>
          <Card.Title>
            <h2 className={listView ? "card-title-sm" : "card-title"}>
              {restaurant.name}
            </h2>
          </Card.Title>
          <h6 className={listView ? "card-ratings-sm" : "card-ratings"}>
            Rating: {restaurant.rating} ({restaurant.review_count} reviews)
          </h6>
          <Card.Text className={listView ? "card-address-sm" : "card-address"}>
            {restaurant.location.display_address}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <Card.Text className={listView ? "card-price-sm" : "card-price"}>
            {restaurant.price}
          </Card.Text>
          <Card.Text className={listView ? "card-phone-sm" : "card-phone"}>
            {restaurant.phone}
          </Card.Text>

          {restaurant.hours
            ? restaurant.hours[0].is_open_now
              ? "open now"
              : "closed now"
            : null}
        </ListGroup>
        <Card.Body className={listView ? "card-btns-sm" : "card-btns"}>
          {!hidden && (
            <Button onClick={handlePost} variant="primary" className="list-btn">
              Add to list
            </Button>
          )}
          <Button
            variant="warning"
            onClick={() => setIsCreatingEvent(true)}
            className="event-btn"
          >
            Create event
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate(`/restaurants/${restaurant.alias}`)}
            className="details-btn"
          >
            See details
          </Button>
        </Card.Body>
      </Card>
      {isCreatingEvent ? (
        <EventForm
          restaurant={restaurant}
          userData={userData}
          isCreatingEvent={isCreatingEvent}
          setIsCreatingEvent={setIsCreatingEvent}
        />
      ) : null}
    </div>
  );
}

export default RestaurantCard;
