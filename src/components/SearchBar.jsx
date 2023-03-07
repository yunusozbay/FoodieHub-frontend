import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Find Foodie Friends"
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {/* <Button variant="outline-success">Search</Button> */}
    </Form>
  );
}

export default SearchBar;
