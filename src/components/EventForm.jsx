import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
import { useNavigate } from "react-router";

function EventForm({
  restaurant,
  event,
  isEditingEvent,
  setIsEditingEvent,
  isCreatingEvent,
  setIsCreatingEvent,
}) {
  const [show, setShow] = useState(true);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [invited_users, setInvited_users] = useState([]);
  const { userData, refreshData } = useContext(SessionContext);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditingEvent) {
      setTitle(event.title);
      setDate(event.date.slice(0, 10));
      setTime(event.time);
    }
  }, []);

  async function handleSubmit() {
    if (isEditingEvent) {
      await axios.post(`${BASE_URL}/events/${event._id}/edit`, {
        title,
        date,
        time,
        invited_users,
      });
    }
    const response = await axios.post(`${BASE_URL}/events/new`, {
      userData,
      restaurant,
      newEvent: { title, date, time, invited_users },
    });
    refreshData(response.data.updatedUser);
    navigate("/profile");
  }

  // const fetchData = async () => {
  //   const response = await axios.get(`${BASE_URL}/users/${userData._id}`);
  //   refreshData(response.data.oneUser);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [userData]);

  const handleClose = () => {
    isEditingEvent ? setIsEditingEvent(false) : null;
    isCreatingEvent ? setIsCreatingEvent(false) : null;
    setShow(false);
  };

  const handleSelect = function (selectedItems) {
    const invited = [];
    for (let i = 0; i < selectedItems.length; i++) {
      invited.push(selectedItems[i].value);
    }
    setInvited_users(invited);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditingEvent ? "Edit your event" : "Create an event"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Title
                <Form.Control
                  type="text"
                  autoFocus
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </Form.Label>
              <Form.Label>
                Date
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </Form.Label>
              <Form.Label>
                Time
                <Form.Control
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                />
              </Form.Label>
              {userData && userData.friends.length ? (
                <Form.Label>
                  Invite a Foodie Friend
                  <Form.Select
                    name="invited_users"
                    onChange={(e) => {
                      handleSelect(e.target.selectedOptions);
                    }}
                    multiple
                  >
                    {userData &&
                      userData.friends.map((friend) => (
                        <option value={friend._id}>{friend.username}</option>
                      ))}
                  </Form.Select>
                </Form.Label>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Button type="submit">Save</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EventForm;
