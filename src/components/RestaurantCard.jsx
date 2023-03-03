import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { SessionContext } from "../contexts/SessionContext";


function RestaurantCard({ restaurant, listView  }) {
  const { userData } = useContext(SessionContext);
  async function handlePost() {
    await axios.post('http://localhost:5005/api/add', {
      userData
    })
    console.log(userData)
    
  }
  return (
    <Card className="mt-3 restaurant-card">
      <Card.Img
        variant="top"
        src={restaurant.image_url}
        className={listView ? "card-img-sm" : "card-img"}
      />
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

      <Card.Body className={listView ? "card-body-sm" : "card-body"}>
        <Button onClick={handlePost} variant="primary">Add to list</Button>
        <Card.Link href="#">Create event</Card.Link>
        <Card.Link href="#">See details</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default RestaurantCard;
