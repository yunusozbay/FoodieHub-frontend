import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function EventForm({ restaurant }) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create an event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={`Dinner at restaurant "${restaurant.name}"`}
              />
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" autoFocus />
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" autoFocus />
              <Form.Label>Invite</Form.Label>
              <Form.Select id="cars" name="cars">
                <option value="friend-name">Friend1</option>
              </Form.Select>
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
