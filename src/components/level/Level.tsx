import React, { useEffect } from "react";
import { useGet } from "../hooks/useGet.ts";
import { Level, Unit } from "../types";
import { NavigationButton } from "../buttons/NavigationButton.tsx";
import { UnitList } from "../unit/UnitList.tsx";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { userType } from "../Utils/userType.ts";
import { Loading, Error } from "./../common";
interface LevelGetOneProps {
  id: string | undefined;
  courseId: string | undefined;
}

export const LevelGetOne: React.FC<LevelGetOneProps> = ({ id, courseId }) => {
  const { data, loading, error, fetchData } = useGet<Level>(
    `/api/levels/${id}`
  );
  const level = Array.isArray(data) ? data[0] : data;
  const unitsIds = Array.isArray(level?.units)
    ? level.units.map((unit: Unit) => unit.id)
    : [];
  console.log(unitsIds);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  const user = userType() ? userType() : "member";
  return (
    <Container>
      <br />
      <Card>
        <Card.Header as="h3">
          Level {level?.order}: {level?.name}
        </Card.Header>
        <Card.Body>
          <div style={{ textAlign: "left" }}>
            <Card.Text className="fs-4">
              <strong>Description:</strong> {level?.description}
            </Card.Text>
            <Card.Text className="fs-4">
              <strong>Units:</strong>
            </Card.Text>
            <UnitList units={unitsIds} level={id} course={courseId} />
          </div>
          {user === "admin" && (
            <NavigationButton
              className="d-flex justify-content-center"
              to={`/level/update/${courseId}/${id}`}
              label="Edit"
              style={{ marginTop: "2rem" }}
            />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
