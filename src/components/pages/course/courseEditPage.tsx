import React from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NavigationButton } from "../../common/buttons";
import { CourseUpdate } from "../../course";

export const CourseUpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Card>
      <CourseUpdate courseId={id} />
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
