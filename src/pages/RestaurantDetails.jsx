import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router";
import EventForm from "../components/EventForm";
import { SessionContext } from "../contexts/SessionContext";

function RestaurantDetails() {
  const [oneRestaurant, setOneRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  const { userData } = useContext(SessionContext);
  const { alias } = useParams();

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  const fetchData = async () => {

    const response = await axios.post(`${BASE_URL}/search/restaurant`,  {
      id: alias
    });
    setOneRestaurant(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div className="detail-btns">
            <Button variant="warning">Add to my list</Button>
            <Button
              variant="secondary"
              onClick={() => setIsCreatingEvent(true)}
            >
              Create an event
            </Button>
          </div>
          <article className="restaurant-details">
            <h1 className="mt-3">{oneRestaurant.name}</h1>
            <img
              src={oneRestaurant.image_url && oneRestaurant.image_url}
              className="main-img"
            />
            <div>
              {oneRestaurant.photos &&
                oneRestaurant.photos.map((photo) => (
                  <img key={photo}
                    src={photo}
                    alt={oneRestaurant.name}
                    className="small-img"
                  />
                ))}
            </div>
            <h4>
              Rating: {oneRestaurant.rating && oneRestaurant.rating} (
              {oneRestaurant.review_count && oneRestaurant.review_count}{" "}
              Reviews)
            </h4>
            <div>
              {oneRestaurant.categories &&
                oneRestaurant.categories.map((category) => (
                  <span key={category.title}>{category.title}, </span>
                ))}
            </div>
            <h6>{oneRestaurant.price && oneRestaurant.price}</h6>
            <p>
              {oneRestaurant.location.display_address &&
                oneRestaurant.location.display_address}
            </p>
            <h6>
              {oneRestaurant.display_phone && oneRestaurant.display_phone}
            </h6>
            <h6>
              {oneRestaurant.hours && oneRestaurant.hours[0].is_open_now
                ? "open now"
                : "closed now"}
            </h6>
          </article>
        </>
      )}
      {isCreatingEvent && userData === undefined ? navigate("/login") : null}
      {isCreatingEvent ? (
        <EventForm
          restaurant={oneRestaurant}
          userData={userData}
          isCreatingEvent={isCreatingEvent}
          setIsCreatingEvent={setIsCreatingEvent}
        />
      ) : null}
    </Container>
  );
}

export default RestaurantDetails;
