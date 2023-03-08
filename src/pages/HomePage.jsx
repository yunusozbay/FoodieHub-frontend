import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect, useContext } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { Link } from "react-router-dom";
import SpinnerComponent from "../components/Spinner";
import { SessionContext } from "../contexts/SessionContext";

const HomePage = ({ handleSubmit, randomRest, isLoading, isShowingRandom }) => {
  const [city, setCity] = useState("");
  const [food, setFood] = useState("");
  const [newPlace, setNewPlace] = useState(false);
  // const [hidden, setHidden] = useState(false);
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
      <div className="stage">
        <h2 className="text-center mt-3 greeting">
          Hello,{" "}
          {userData && userData.username !== undefined
            ? `${userData.username}!`
            : "Foodie!"}
        </h2>
        <h1 className="title">Looking for a new restaurant to try?</h1>
        <p className="text-center subtitle">
          We'll help you to find an awesome place!
        </p>
      </div>
      <div className="randomGen mt-5">
        <div className="left-ctn">
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
              className="mt-3"
              variant="warning"
              type="submit"
              // onClick={() => setHidden(false)}
            >
              Show me a restaurant
            </Button>
          </Form>
          <h4 className="mt-5">Would you like to see all your options?</h4>
          <Link to="/restaurants">Browse all restaurants</Link>
        </div>
        {isLoading || isShowingRandom ? (
          <div className="right-ctn">
            {/* <SpinnerComponent /> */}
            {isLoading ? <SpinnerComponent /> : null}
            {!isLoading && isShowingRandom ? (
              <RestaurantCard
                // hidden={hidden}
                // setHidden={setHidden}
                restaurant={randomRest}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </Container>
  );
};

export default HomePage;
