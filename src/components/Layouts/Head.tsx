import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { UserMenu } from "./UserMenu";
import { SearchBox } from "./SearchBox";

export const CustomHead: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="#home">Mi Sitio</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Inicio</Nav.Link>
          <Nav.Link href="#features">Características</Nav.Link>
          <Nav.Link href="#pricing">Precios</Nav.Link>
        </Nav>
        <SearchBox />
        <Nav className="ms-auto">
          <UserMenu />
        </Nav>
      </Container>
    </Navbar>
  );
};
