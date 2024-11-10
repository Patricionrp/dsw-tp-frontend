import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGet } from "../../hooks/useGet.ts";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { CourseList, CourseSelector } from "../../course";
import { Course } from "../../types.tsx";
import { NavigationButton } from "../../Buttons/NavigationButton.tsx";
import { Card } from "react-bootstrap";

export const CourseListPage = () => {
  const [view, setView] = useState(3);

  return (
    <Container style={{ width: "100%" }}>
      <h2>Courses</h2>
      <CourseSelector view={view} setView={setView} />
      <Card>
        <CourseList view={view} />
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
