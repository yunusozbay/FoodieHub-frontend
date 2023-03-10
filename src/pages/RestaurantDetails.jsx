import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router";
import EventForm from "../components/EventForm";
import { SessionContext } from "../contexts/SessionContext";
import Map from "../components/Map";


function RestaurantDetails() {
  const [oneRestaurant, setOneRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [addedToList, setAddedToList] = useState(false);

  const { userData, refreshData } = useContext(SessionContext);
  const { alias } = useParams();

  const YELP_TOKEN = import.meta.env.VITE_YELP_TOKEN;
  const YELP_URL = import.meta.env.VITE_YELP_URL
  
  const fetchData = async () => {
    const response = await axios.get(`${YELP_URL}/${alias}`, {
      headers: {
        Authorization: `Bearer ${YELP_TOKEN}`,
        withCredentials: true,
      },
    });
    console.log(response.data);
    setOneRestaurant(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handlePost() {
    console.log(oneRestaurant);
    if (!userData || userData.username === undefined) {
      navigate("/login");
    } else {
      const response = await axios.post(
        "http://localhost:5005/restaurants/add",

        {
          userData,
          restaurant: oneRestaurant,
        }
      );
      setAddedToList(true);
      refreshData(response.data.updatedUser);
    }
    console.log(userData);
  }

  return (
    <>
      <Container>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <div className="detail-btns">
              <Button
                variant="warning"
                onClick={handlePost}
                disabled={addedToList ? true : false}
              >
                {addedToList ? "Added to my list" : "Add to my list"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsCreatingEvent(true)}
              >
                Create an event
              </Button>
            </div>

            <article className="restaurant-details">
              <h1 className="mt-3">{oneRestaurant.name}</h1>
              <div className="photo-grid col-12">
                {oneRestaurant.photos &&
                  oneRestaurant.photos.map((photo) => (
                    <div className="grid-photo"key={photo}>
                      {console.log(photo)}
                      <img src={photo} alt={oneRestaurant.name} />
                    </div>
                  ))}

                <div className="card col-8 mt-8">
                  <div className="card-body">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>
                            <b>Rating:</b>
                          </td>
                          <td>
                            {oneRestaurant.rating && oneRestaurant.rating} (
                            {oneRestaurant.review_count &&
                              oneRestaurant.review_count}{" "}
                            Reviews)
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Categories:</b>
                          </td>
                          <td>
                            {oneRestaurant.categories &&
                              oneRestaurant.categories.map((category) => (
                                <span key={category}>{category.title}, </span>
                              ))}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Price:</b>
                          </td>
                          <td>{oneRestaurant.price && oneRestaurant.price}</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Address:</b>
                          </td>
                          <td>
                            {oneRestaurant.location.display_address &&
                              oneRestaurant.location.display_address}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Phone:</b>
                          </td>
                          <td>
                            {oneRestaurant.display_phone &&
                              oneRestaurant.display_phone}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Is opened:</b>
                          </td>
                          <td>
                            {oneRestaurant.hours &&
                            oneRestaurant.hours[0].is_open_now
                              ? "open now"
                              : "closed now"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </article>

            {Object.keys(oneRestaurant).length !== 0 && (
              <Map
                latitude={oneRestaurant.coordinates.latitude}
                longitude={oneRestaurant.coordinates.longitude}
                oneRestaurant={oneRestaurant}
              />
            )}
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
    </>
  );
}

export default RestaurantDetails;
