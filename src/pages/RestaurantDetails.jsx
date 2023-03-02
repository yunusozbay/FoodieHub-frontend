import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router";

function RestaurantDetails({ restaurants }) {
  const [oneRestaurant, setOneRestaurant] = useState({});

  const { id } = useParams();

  const YELP_TOKEN = import.meta.env.VITE_YELP_TOKEN;
  const BASE_URL =
    "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses";

  const fetchData = async () => {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${YELP_TOKEN}`,
        withCredentials: true,
      },
    });
    setOneRestaurant(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(oneRestaurant);
  return (
    <Container>
      <div className="detail-btns">
        <Button variant="warning">Add to my list</Button>
        <Button variant="secondary">Create an event</Button>
      </div>
      <article className="restaurant-details">
        <h1 className="mt-3">{oneRestaurant.name}</h1>
        <img src={oneRestaurant.image_url} className="main-img" />
        <div>
          {oneRestaurant.photos.map((photo) => (
            <img src={photo} alt={oneRestaurant.name} className="small-img" />
          ))}
        </div>
        <h4>
          Rating: {oneRestaurant.rating} ({oneRestaurant.review_count} Reviews)
        </h4>
        <div>
          {oneRestaurant.categories.map((category) => (
            <span>{category.title}, </span>
          ))}
        </div>
        <h6>{oneRestaurant.price}</h6>
        <p>{oneRestaurant.location.display_address}</p>
        <h6>{oneRestaurant.display_phone}</h6>
        <h6>
          {oneRestaurant.hours
            ? oneRestaurant.hours[0].is_open_now
              ? "open now"
              : "closed now"
            : null}
        </h6>
      </article>
    </Container>
  );
}

export default RestaurantDetails;
