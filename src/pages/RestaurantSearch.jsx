import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function RestaurantSearch({ restaurants, handleSubmit, isLoading }) {
  const [city, setCity] = useState("");
  const [food, setFood] = useState("");
  const [newPlace, setNewPlace] = useState(false);
  const [listView, setListView] = useState(false);

  useEffect(() => {
    setListView(true);
  }, []);

  console.log(restaurants);
  const submitCallback = (event) => {
    event.preventDefault();
    handleSubmit(city, food);
  };

  const checkHandler = () => {
    setNewPlace(!newPlace);
  };
  return (
    <div>
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
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Only where I haven't been yet"
              checked={newPlace}
              onChange={checkHandler}
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
        <Row xs={2} md={3} lg={5} className="g-4">
          {restaurants.map((restaurant) => (
            <Col className="card-col">
              <Link to={`/restaurants/${restaurant.id}`}>
                <RestaurantCard restaurant={restaurant} listView={listView} />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default RestaurantSearch;
