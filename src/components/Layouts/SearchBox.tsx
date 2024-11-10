import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

export const SearchBox: React.FC = () => {
  return (
    <Form className="search-box">
      <FormControl
        type="search"
        placeholder="Buscar"
        className="search-input"
        aria-label="Buscar"
        style={{ fontSize: "20px" }}
      />
      <Button variant="outline-light" className="search-button">
        <FaSearch size={25} />
      </Button>
    </Form>
  );
};
