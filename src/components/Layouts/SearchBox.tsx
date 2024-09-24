import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

export const SearchBox: React.FC = () => {
  return (
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Buscar"
        className="me-2"
        aria-label="Buscar"
        style={{
          backgroundColor: "#6c757d",
          color: "white",
          border: "1px solid #6c757d",
        }} // Gris oscuro
      />
      <Button variant="outline-light">Buscar</Button>{" "}
      {/* Botón con borde blanco */}
    </Form>
  );
};
