import React from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NavigationButton } from "../../common/buttons";
import { LevelUpdate } from "../../level";

export const LevelUpdatePage: React.FC = () => {
  const { id, courseId } = useParams<{ id: string; courseId: string }>();

  return (
    <Card>
      <LevelUpdate courseId={courseId} levelId={id} />
      <Container
        className="d-flex justify-content-center"
        style={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        <NavigationButton
          style={{ backgroundColor: "#444", color: "#fff" }}
          to={`/course/${courseId}`}
          label="Back to course"
        />
      </Container>
    </Card>
  );
};
