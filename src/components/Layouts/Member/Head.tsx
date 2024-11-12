import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserMenu } from "../UserMenu";
import { SearchBox } from "../SearchBox";

export const MemberHead: React.FC = () => {
  return (
    <Navbar
      className="py-3 fs-5"
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
    >
      <Container fluid>
        <Navbar.Brand href="/" style={{ marginLeft: "2rem" }}>
          My App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Container className="d-flex justify-content-center">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Courses" id="course-dropdown">
                <NavDropdown.Item href="/course/list">
                  View All
                </NavDropdown.Item>
                <NavDropdown.Item href="/myCourses">
                  My Courses
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Subscriptions"
                id="subscriptions-dropdown"
                style={{ marginLeft: "2.5rem" }}
              >
                <NavDropdown.Item href="/subscription/list">
                  View All
                </NavDropdown.Item>
                <NavDropdown.Item href="/inDevelopment/My Subscriptions">
                  My Subscriptions
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Nav className="ms-auto">
          <UserMenu />
        </Nav>
      </Container>
    </Navbar>
  );
};
