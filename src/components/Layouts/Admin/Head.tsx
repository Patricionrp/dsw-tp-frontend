import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
//import { UserMenu } from "./UserMenu";
//import { SearchBox } from "./SearchBox";

export const AdminHead: React.FC = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">My App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Topics" id="topics-dropdown">
                <NavDropdown.Item href="/topics/list">
                  View All
                </NavDropdown.Item>
                <NavDropdown.Item href="/topics/create">
                  Add New
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Courses" id="course-dropdown">
                <NavDropdown.Item href="/courses/list">
                  View All
                </NavDropdown.Item>
                <NavDropdown.Item href="/courses/create">
                  Add New
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Pruchases" id="compras-dropdown">
                <NavDropdown.Item href="/purchases/courses">
                  Purchase Records of Courses
                </NavDropdown.Item>
                <NavDropdown.Item href="/purchases/subcriptions">
                  Purchase Records of Subscriptions
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Subcriptions" id="subscripciones-dropdown">
                <NavDropdown.Item href="/subcriptions/list">
                  View All
                </NavDropdown.Item>
                <NavDropdown.Item href="/subcriptions/create">
                  Add New
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
