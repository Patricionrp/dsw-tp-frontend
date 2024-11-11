import React from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NavigationButton } from "../../buttons/NavigationButton.tsx";
import { CourseGetOne } from "../../course";

export const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Card>
      <CourseGetOne id={id} />
      <Container
        className="d-flex justify-content-center"
        style={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        <NavigationButton
          style={{ backgroundColor: "#444", color: "#fff" }}
          to={`/course/list`}
          label="Back to courses"
        />
      </Container>
    </Card>
  );
};
