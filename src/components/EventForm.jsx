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
  const [invitedUsers, setInvitedUsers] = useState("");

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
        invitedUsers,
      });
    }
    await axios.post("http://localhost:5005/events/new", {
      userData,
      restaurant,
      newEvent: { title, date, time, invitedUsers },
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
              <Form.Label>
                Invite
                <Form.Select
                  value={invitedUsers}
                  onChange={(event) => setInvitedUsers(event.target.value)}
                >
                  <option value="user">Friend1</option>
                  <option value="user">Friend2</option>
                  <option value="user">Friend3</option>
                </Form.Select>
              </Form.Label>
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
