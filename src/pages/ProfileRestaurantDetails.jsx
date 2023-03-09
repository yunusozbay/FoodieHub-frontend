import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Card, Button, Form } from "react-bootstrap";

function ProfileRestaurantDetails() {
  const [restaurant, setRestaurant] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  async function fetchRestaurant() {
    const response = await axios.get(
      `${BASE_URL}/restaurants/profile/${id}`
    );
    console.log(response.data.restaurant);
    setRestaurant(response.data.restaurant);
    setIsLoading(false);
  }

  async function uploadPhoto(e, id) {
    e.preventDefault();
    let photo = e.target.userPhotos.files[0];
    let formData = new FormData();
    formData.append("userPhotos", photo);
    try {
      const response = await axios.post(
        `${BASE_URL}/restaurants/profile/${id}/edit`,
        formData,
      );
      setRestaurant(response.data.updatedRestaurant);
      console.log(response.data);
    } catch (error) {
      console.log(error, "photo upload failed");
    }
  }

  useEffect(() => {
    fetchRestaurant();
    if (!isLoading) {
      console.log(restaurant);
    }
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
        <Card style={{ width: "100wv", margin: "auto" }}>
          <Card.Img variant="top" src={restaurant.image_url} />
          <Card.Body>
            <Card.Title>{restaurant.name}</Card.Title>
            <Card.Text>Phone: {restaurant.phone}</Card.Text>
            <Card.Text>Price: {restaurant.price}</Card.Text>
            <Card.Text>Rating: {restaurant.rating}</Card.Text>
            <Card.Text>Reviews: {restaurant.review_count}</Card.Text>
            <form onSubmit={(e) => uploadPhoto(e, id)}>
              <div className="column">
                <input
                  name="userPhotos"
                  type="file"
                  accept="image/jpeg, image/png"
                />
                <Button type="submit" variant="outline-warning">
                  Add Photos
                </Button>
              </div>
            </form>
            <Button
              style={{ width: "200px", margin: "auto" }}
              variant="outline-warning"
            >
              Rate
            </Button>
          </Card.Body>
        </Card>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly"}}>
       {restaurant.userPhotos.map((photo) => (
            <Card style={{ width: "20rem" }}>
              <Card.Body>
              <Card.Img  src={photo} />
              </Card.Body>
            </Card>
          ))}
        </div>
        </>
      )}
    </div>
  );
}

export default ProfileRestaurantDetails;
