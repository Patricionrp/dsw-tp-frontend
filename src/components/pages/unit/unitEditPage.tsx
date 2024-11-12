import React from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NavigationButton } from "../../common/buttons/";
import { UnitUpdate } from "../../unit";

export const UnitUpdatePage: React.FC = () => {
  const { id, levelId, courseId } = useParams<{
    id: string;
    levelId: string;
    courseId: string;
  }>();

  return (
    <Card>
      <UnitUpdate courseId={courseId} levelId={levelId} id={id} />
      <Container
        className="d-flex justify-content-center"
        style={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        <NavigationButton
          style={{ backgroundColor: "#444", color: "#fff" }}
          to={`/level/${courseId}/${levelId}`}
          label="Back to level"
        />
      </Container>
    </Card>
  );
};
