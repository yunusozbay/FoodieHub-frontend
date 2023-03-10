import React, { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EventForm from "./EventForm";
import axios from "axios";
import { SessionContext } from "../contexts/SessionContext";

function RestaurantCard({ restaurant, isOwner }) {
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { userData, refreshData } = useContext(SessionContext);

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  async function handlePost() {
    if (!userData || userData.username === undefined) {
      navigate("/login");
    } else {
      const response = await axios.post(`${BASE_URL}/restaurants/add`, {
        userData,
        restaurant,
      });
      setIsAdded(true);
      refreshData(response.data.updatedUser);
    }
  }

  const handleDelete = async () => {
    const response = await axios.post(
      `${BASE_URL}/restaurants/${restaurant._id}/delete`,
      { userId: userData._id }
    );
    refreshData(response.data.updatedUser);
  };

  return (
    <>
      <Card className="restaurant-card">
        <Card.Img
          variant="top"
          src={restaurant.image_url}
          className={"card-img"}
        />
        {!isOwner ? (
          <>
            <button
              className={!isAdded ? "add-to-list" : "added-to-list"}
              onClick={handlePost}
            ></button>
            <div className="hide hide-add">Add to my collection</div>
          </>
        ) : (
          <>
            <button className="removeFromList" onClick={handleDelete}></button>
            <div className="hide hide-remove">Remove from collection</div>
          </>
        )}

        <Card.Body className={"card-body"}>
          <Card.Title>
            <h2 className={"card-title"}>{restaurant.name}</h2>
          </Card.Title>
          <h6 className={"card-ratings"}>
            Rating: {restaurant.rating} ({restaurant.review_count} reviews)
          </h6>
          <Card.Text className={"card-address"}>
            <strong>Address:</strong>{" "}
            {restaurant.location && restaurant.location.display_address}
          </Card.Text>

          <Card.Text className={"card-price"}>
            <strong>Price:</strong> {restaurant.price}
          </Card.Text>
          <Card.Text className={"card-phone"}>
            <strong>Phone:</strong> {restaurant.phone}
          </Card.Text>

          {restaurant.hours
            ? restaurant.hours[0].is_open_now
              ? "open now"
              : "closed now"
            : null}

          <div className={"card-btns"}>
            <Button
              variant="outline-secondary"
              onClick={() => setIsCreatingEvent(true)}
              className="event-btn"
            >
              Create event
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                isOwner
                  ? navigate(`/restaurants/profile/${restaurant._id}`)
                  : navigate(`/restaurants/${restaurant.alias}`)
              }
              className="details-btn"
            >
              See details
            </Button>
          </div>
        </Card.Body>
      </Card>
      {isCreatingEvent && userData === undefined ? navigate("/login") : null}
      {isCreatingEvent ? (
        <EventForm
          restaurant={restaurant}
          userData={userData}
          isCreatingEvent={isCreatingEvent}
          setIsCreatingEvent={setIsCreatingEvent}
        />
      ) : null}
    </>
  );
}

export default RestaurantCard;
