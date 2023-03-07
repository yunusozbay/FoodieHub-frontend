import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect, useContext } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { Link } from "react-router-dom";
import SpinnerComponent from "../components/Spinner";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import Notifications from "../components/Notifications";
import { SessionContext } from "../contexts/SessionContext";
import NavBarComp from "../components/NavBarComp";

const HomePage = ({ handleSubmit, randomRest, isLoading, isShowingRandom }) => {
  const [city, setCity] = useState("");
  const [food, setFood] = useState("");
  const [newPlace, setNewPlace] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [hidden, setHidden] = useState(false);
  const { userData } = useContext(SessionContext);

  const submitCallback = (event) => {
    event.preventDefault();
    handleSubmit(city, food);
  };

  const checkHandler = () => {
    setNewPlace(!newPlace);
  };
  return (
    <Container className="homeCtn">
      {/* <NavBarComp /> */}
      <h2 className="text-center mt-3">
        Hello,{" "}
        {userData && userData.username !== undefined ? (
          <span>{userData.username}!</span>
        ) : (
          "Foodie!"
        )}
      </h2>
      <h1 className="title">Looking for a new restaurant to try?</h1>
      <h6 className="text-center">We'll help you to find an awesome place!</h6>
      <Form className="restaurant-search-form" onSubmit={submitCallback}>
        <Form.Group
          className="mb-3"
          controlId="formBasicCity"
          style={{ width: "100%" }}
        >
          <Form.Label>Where are you searching?</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Berlin"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicFood">
          <Form.Label>What would you like to eat?</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Burgers"
            value={food}
            onChange={(event) => setFood(event.target.value)}
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Only where I haven't been yet"
            checked={newPlace}
            onChange={checkHandler}
          />
        </Form.Group> */}
        <Button
          variant="outline-warning"
          type="submit"
          onClick={() => setHidden(false)}
        >
          Show me a restaurant
        </Button>
      </Form>
      {isLoading ? <SpinnerComponent /> : null}
      {isShowingRandom ? (
        <RestaurantCard
          hidden={hidden}
          setHidden={setHidden}
          restaurant={randomRest}
        />
      ) : null}
      <h4>Would you like to see all your options?</h4>
      <Link to="/restaurants">Browse all restaurants</Link>
    </Container>
  );
};

export default HomePage;
