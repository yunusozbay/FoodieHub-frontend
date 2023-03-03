import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function EventForm({ restaurant, userData }) {
  const [show, setShow] = useState(true);
  const [title, setTitle] = useState(
    `Dinner at restaurant "${restaurant.name}"`
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [invitedUsers, setInvitedUsers] = useState("");

  async function handleSubmit() {
    await axios.post("http://localhost:5005/events/new", {
      userData,
      restaurant,
      newEvent: { title, date, time, invitedUsers },
    });
  }

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create an event</Modal.Title>
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
                  id="invited_users"
                  name="invited_users"
                  value={invitedUsers}
                  onChange={(event) => setInvitedUsers(event.target.value)}
                >
                  <option value="user">Friend1</option>
                  <option value="user">Friend2</option>
                  <option value="user">Friend3</option>
                </Form.Select>
              </Form.Label>
              <Button type="submit">Save</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="warning" onClick={handleClose}>
            Save Event
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// render(<Example />);
export default EventForm;
