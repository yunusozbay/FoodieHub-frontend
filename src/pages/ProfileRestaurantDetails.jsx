import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Card, Button, Form, Container } from "react-bootstrap";
import Map from "../components/Map";

function ProfileRestaurantDetails() {
  const [restaurant, setRestaurant] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  async function fetchRestaurant() {
    const response = await axios.get(`${BASE_URL}/restaurants/profile/${id}`);
    console.log(response.data.restaurant);
    setRestaurant(response.data.restaurant);
    setIsLoading(false);
  }

  async function uploadPhoto(e, id) {
    e.preventDefault();
    if (!e.target.userPhotos) {
      return;
    }
    let photo = e.target.userPhotos.files[0];
    let formData = new FormData();
    formData.append("userPhotos", photo);
    try {
      const response = await axios.post(
        `${BASE_URL}/restaurants/profile/${id}/edit`,
        formData
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
          <Container>
            <article className="restaurant-details"></article>
            <h1 className="mt-3 text-uppercase">{restaurant.name}</h1>
            <div className="map-picture">
              <img
              src={restaurant.image_url}
              className="mb-4"
              style={{ width: "500px", height: "500px" }}
            />
            {restaurant.coordinates !== undefined}{<Map
              latitude={restaurant.coordinates.latitude}
              longitude={restaurant.coordinates.longitude}
              oneRestaurant={restaurant}
            />}
            </div>
            

            <div className="card col-8 mt-8">
              <div className="card-body">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <b>Rating:</b>
                      </td>
                      <td>
                        {restaurant.rating} ({restaurant.review_count} Reviews)
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Price:</b>
                      </td>
                      <td>{restaurant.price}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Phone:</b>
                      </td>
                      <td>{restaurant.phone}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-3">
              <form onSubmit={(e) => uploadPhoto(e, id)}>
                <div>
                  <h5>Upload your pictures</h5>
                  <input
                    name="userPhotos"
                    type="file"
                    accept="image/jpeg, image/png"
                  />
                  <br />
                  <Button
                    type="submit"
                    variant="outline-warning"
                    className="mt-3"
                  >
                    Add Photos
                  </Button>
                </div>
              </form>
            </div>
            <div className="photo-grid col-12 mt-4">
              {restaurant.userPhotos.map((photo) => (
                <div className="grid-photo">
                  <img src={photo} />
                </div>
              ))}
            </div>
          </Container>
        </>
      )}
    </div>
  );
}

export default ProfileRestaurantDetails;
