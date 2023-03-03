import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { SessionContext } from "../contexts/SessionContext";

function RestaurantCard({ restaurant }) {
  const { userData } = useContext(SessionContext);
  async function handlePost() {
    await axios.post('http://localhost:5005/api/add', {
      userData
    })
    console.log(userData)
    
  }
  return (
    <Card style={{ width: "18rem" }} className="mt-3">
      <Card.Img
        style={{ width: "100%", height: "15rem", objectFit: "cover" }}
        variant="top"
        src={restaurant.image_url}
      />
      <Card.Body>
        <Card.Title>
          <h2>{restaurant.name}</h2>
        </Card.Title>
        <h6>
          Rating: {restaurant.rating} ({restaurant.review_count} reviews)
        </h6>
        <Card.Text>{restaurant.location.display_address}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{restaurant.price}</ListGroup.Item>
        <ListGroup.Item>{restaurant.phone}</ListGroup.Item>
        <ListGroup.Item>
          {restaurant.hours[0].is_open_now ? "open now" : "closed now"}
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button onClick={handlePost} variant="primary">Add to list</Button>
        <Card.Link href="#">Create event</Card.Link>
        <Card.Link href="#">See details</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default RestaurantCard;
