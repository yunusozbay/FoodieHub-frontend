import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function EventForm({
  restaurant,
  userData,
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
  const [invited_users, setInvited_users] = useState("");

  useEffect(() => {
    if (isEditingEvent) {
      setTitle(event.title);
      setDate(event.date.slice(0, 10));
      setTime(event.time);
    }
  }, []);

  async function handleSubmit() {
    if (isEditingEvent) {
      await axios.post(`http://localhost:5005/events/${event._id}/edit`, {
        title,
        date,
        time,
        invited_users,
      });
    }
    await axios.post("http://localhost:5005/events/new", {
      userData,
      restaurant,
      newEvent: { title, date, time, invited_users },
    });
  }

  const handleClose = () => {
    isEditingEvent ? setIsEditingEvent(false) : null;
    isCreatingEvent ? setIsCreatingEvent(false) : null;
    setShow(false);
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
              {userData.friends.length ? (
                <Form.Label>
                  Invite a Foodie Friend
                  <Form.Select
                    onChange={(event) => setInvited_users(event.target.value)}
                  >
                    {userData.friends.map((friend) => (
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
