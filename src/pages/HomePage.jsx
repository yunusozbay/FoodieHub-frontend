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

const HomePage = ({ handleSubmit, randomRest, isLoading, isShowingRandom }) => {
  const [city, setCity] = useState("");
  const [food, setFood] = useState("");
  const [newPlace, setNewPlace] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [hidden, setHidden] = useState(false);
  const { userData } = useContext(SessionContext);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5005/users");
    // const filteredUsers = response.data.allUsers.filter((user) => {
    //   user._id !== userData.id;
    // });
    setAllUsers(response.data.allUsers);
  };

  useEffect(() => {
    if (userData && userData.username !== undefined) {
      fetchData();
    }
  }, [userData]);

  const submitCallback = (event) => {
    event.preventDefault();
    handleSubmit(city, food);
  };

  const checkHandler = () => {
    setNewPlace(!newPlace);
  };
  return (
    <Container className="homeCtn">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {allUsers.map((user) =>
        searchTerm &&
        user.username !== userData.username &&
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ? (
          <Link key={user._id} to={`/users/${user._id}`}>
            <div>{user.username}</div>
          </Link>
        ) : null
      )}
      <h2 className="text-center mt-3">
        Hello,{" "}
        {userData && userData.username !== undefined ? (
          <span>{userData.username}!</span>
        ) : (
          "Foodie!"
        )}
      </h2>
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
