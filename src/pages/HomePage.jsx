import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [rest, setRest] = useState([]);
  const [randomRest, setRandomRest] = useState({});
  const [city, setCity] = useState("");
  const [food, setFood] = useState("");
  const [newPlace, setNewPlace] = useState(false);
  const [isShowingRandom, setIsShowingRandom] = useState(false);

  const YELP_TOKEN = import.meta.env.REACT_APP_YELP_TOKEN;
  const BASE_URL =
    "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses";

  const handleSubmit = async () => {
    const allRest = await axios.get(
      `${BASE_URL}/search?location=${city}&term=${food}&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${YELP_TOKEN}`,
          withCredentials: true,
        },
      }
    );
    setRest(allRest.data.businesses);
    fetchRandom();
  };
  const fetchRandom = async () => {
    const random = Math.floor(Math.random() * rest.length);
    const randomId = rest[random].id;
    const response = await axios.get(`${BASE_URL}/${randomId}`, {
      headers: {
        Authorization: `Bearer ${YELP_TOKEN}`,
        withCredentials: true,
      },
    });
    setRandomRest(response.data);
    setIsShowingRandom(true);
  };

  const checkHandler = () => {
    setNewPlace(!newPlace);
  };

  return (
    <Container>
      <h1>Looking for a new restaurant to try?</h1>
      <Form>
        <h4 className="text-center">Tell us your criterias:</h4>
        <Form.Group className="mb-3" controlId="formBasicCity">
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
        {/* <Button variant="primary" type="submit">
          Show me a restaurant
        </Button> */}
      </Form>
      <Button variant="outline-warning" onClick={handleSubmit}>
        Show me a restaurant
      </Button>
      {isShowingRandom ? <RestaurantCard restaurant={randomRest} /> : null}
      <h4>Would you like to see all your options?</h4>
      <Link>Browse all restaurants</Link>
    </Container>
  );
};

export default HomePage;
