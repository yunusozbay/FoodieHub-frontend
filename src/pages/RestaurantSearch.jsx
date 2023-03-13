import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function RestaurantSearch({ restaurants, handleSubmit, isLoading }) {
  const [city, setCity] = useState("");
  const [food, setFood] = useState("");

  const submitCallback = (event) => {
    event.preventDefault();
    handleSubmit(city, food);
  };
  return (
    <div className="restSearch-ctn">
      <Container>
        <Form className="restaurant-search-form" onSubmit={submitCallback}>
          <Form.Group
            className="mb-3"
            controlId="formBasicCity"
            style={{ width: "100%" }}
          >
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Berlin"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicFood">
            <Form.Label>Food</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g Burgers"
              value={food}
              onChange={(event) => setFood(event.target.value)}
            />
          </Form.Group>
          <Button variant="outline-warning" type="submit">
            Search
          </Button>
        </Form>
        <div className="result-links">
          <Link>Sort by</Link>
          <Link>Map view</Link>
        </div>
      </Container>
      <Container>
        <Row xs={1} md={3} lg={4} className="g-4">
          {restaurants &&
            restaurants.map((restaurant) => (
              <Col key={restaurant.id} className="card-col">
                <RestaurantCard restaurant={restaurant} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default RestaurantSearch;
