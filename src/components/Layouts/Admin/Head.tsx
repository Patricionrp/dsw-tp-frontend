import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserMenu } from "./../UserMenu";
import { SearchBox } from "./../SearchBox";

export const AdminHead: React.FC = () => {
  return (
    <Navbar
      className="py-3 fs-5"
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      max-width="100%"
    >
      <Container fluid>
        <Navbar.Brand href="/" style={{marginLeft:"2rem"}}>My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Container className="d-flex justify-content-center">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Courses" id="course-dropdown" >
                <NavDropdown.Item href="/course/list">
                  View All
                </NavDropdown.Item>
                <NavDropdown.Item href="/course/create">
                  Add New
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Topics" id="topics-dropdown" style={{marginLeft:"1rem"}}>
                <NavDropdown.Item href="/topic/list">View All</NavDropdown.Item>
                <NavDropdown.Item href="/topic/create">
                  Add New
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Pruchases" id="purchaces-dropdown" style={{marginLeft:"1rem"}}>
                <NavDropdown.Item href="/coursePurchaseRecords">
                  Purchases of Courses
                </NavDropdown.Item>
                <NavDropdown.Item href="/inDevelopment/Purchases of Subscriptions">
                  Purchases of Subscriptions
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Subscriptions" id="subscriptions-dropdown" style={{marginLeft:"1rem"}}>
                <NavDropdown.Item href="/subscription/list">
                  View All
                </NavDropdown.Item>
                <NavDropdown.Item href="/subscription/create">
                  Add New
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
