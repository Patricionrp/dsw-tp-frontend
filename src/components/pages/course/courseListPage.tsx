import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { CourseList, CourseSelector } from "../../course";
import { NavigationButton } from "../../buttons/NavigationButton.tsx";
import { Card } from "react-bootstrap";
import { userType } from "../../Utils/userType.ts";

export const CourseListPage = () => {
  const [view, setView] = useState(3);
  const isAdmin = userType() === "admin";
  return (
    <Container style={{ width: "100%" }}>
      <h2>Courses</h2>
      {isAdmin && <CourseSelector view={view} setView={setView} />}
      <Card>
        <CourseList view={isAdmin ? view : 1} />
      </Card>
      <Container
        fluid
        className="bg-light text-center p-3"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <NavigationButton
          to={`/course/create`}
          label="Add Course"
          variant="success"
        />
        <br />
        <NavigationButton to={`/`} label="Back to Mainpage" />
      </Container>
    </Container>
  );
};
