import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { CourseList, CourseSelector } from "../../course";
import { NavigationButton } from "../../buttons/NavigationButton.tsx";
import { Card } from "react-bootstrap";
import { userType } from "../../common/authentication/userType.ts";
import { SearchBox } from "../../common/utils/searchBox.tsx";

export const CourseListPage = () => {
  const [view, setView] = useState(3);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const isAdmin = userType() === "admin";

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Container
      style={{ marginTop: "1rem", minHeight: "100vh", paddingBottom: "70px" }}
    >
      <Card.Title
        style={{ fontSize: "30px", fontWeight: "bold", marginLeft: "1.5rem" }}
      >
        Courses
      </Card.Title>
      <Card.Body>
        <SearchBox onSearch={handleSearch} />
      </Card.Body>
      {isAdmin && <CourseSelector view={view} setView={setView} />}
      <Card>
        <CourseList view={isAdmin ? view : 1} searchQuery={searchQuery} />{" "}
      </Card>
      <Card.Body className="bg-light text-center p-3">
        <NavigationButton
          to={`/course/create`}
          label="Add Course"
          variant="success"
        />
      </Card.Body>{" "}
      <Card.Body className="bg-light text-center p-3">
        <NavigationButton
          to={`/`}
          label="Back to Mainpage"
          variant="secondary"
        />
      </Card.Body>
    </Container>
  );
};
