import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserMenu } from "./../UserMenu";
import { SearchBox } from "./../SearchBox";

export const AdminHead: React.FC = () => {
   
  //***********************
  // tipo de usuario harcodeado
  let userType = true ? "admin" : "member";
  //**********************************

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Courses" id="course-dropdown">
              <NavDropdown.Item href="/course/list">View All</NavDropdown.Item>
              {userType == "admin" ? (
                <NavDropdown.Item href="/course/create">
                  Add New
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item href="/inDevelopment/My Courses">
                  My Courses
                </NavDropdown.Item>
              )}
            </NavDropdown>

            {userType === "admin" && (
              <>
                <NavDropdown title="Topics" id="topics-dropdown">
                  <NavDropdown.Item href="/topic/list">
                    View All
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/topic/create">
                    Add New
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Pruchases" id="purchaces-dropdown">
                  <NavDropdown.Item href="/coursePurchaseRecords">
                    Purchases of Courses
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/subsPurchaseRecords">
                    Purchases of Subscriptions
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            <NavDropdown title="Subscriptions" id="subscriptions-dropdown">
              <NavDropdown.Item href="/subscription/list">
                View All
              </NavDropdown.Item>
              {userType == "admin" ? (
                <NavDropdown.Item href="/subscription/create">
                  Add New
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item href="/inDevelopment/My Subscriptions">
                  My Subscriptions
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <SearchBox />
        <Nav className="ms-auto">
          <UserMenu />
        </Nav>
      </Container>
    </Navbar>
  );
};
