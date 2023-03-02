import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { Link } from "react-router-dom";
import SpinnerComponent from "../components/Spinner";
import { Spinner } from "react-bootstrap";

const HomePage = ({ handleSubmit, randomRest, isLoading, isShowingRandom }) => {
  const [city, setCity] = useState("");
  const [food, setFood] = useState("");
  const [newPlace, setNewPlace] = useState(false);

  const submitCallback = (event) => {
    event.preventDefault();
    handleSubmit(city, food);
  };

  const checkHandler = () => {
    setNewPlace(!newPlace);
  };
  return (
    <Container>
      <h1 className="title">Looking for a new restaurant to try?</h1>
      <Form className="restaurant-search-form" onSubmit={submitCallback}>
        <h6 className="text-center">Tell us your criterias:</h6>
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
          Show me a restaurant
        </Button>
      </Form>
      {isLoading ? <SpinnerComponent /> : null}
      {isShowingRandom ? <RestaurantCard restaurant={randomRest} /> : null}
      <h4>Would you like to see all your options?</h4>
      <Link to="/restaurants">Browse all restaurants</Link>
    </Container>
  );
};

export default HomePage;
