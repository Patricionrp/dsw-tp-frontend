import React, { useEffect } from "react";
import { useGet } from "../common/hooks/useGet.ts";
import { Unit } from "../types.tsx";
import { NavigationButton } from "../common/buttons";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { userType } from "../common/authentication/userType.ts";
import { Loading, Error } from "./../common/utils";
interface UnitGetOneProps {
  id: string | undefined;
  courseId: string | undefined;
  levelId: string | undefined;
}

export const UnitGetOne: React.FC<UnitGetOneProps> = ({
  id,
  courseId,
  levelId,
}) => {
  const { data, loading, error, fetchData } = useGet<Unit>(`/api/units/${id}`);
  const unit = Array.isArray(data) ? data[0] : data;
  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  const user = userType() ? userType() : "member";
  return (
    <Container>
      <Card
        style={{
          marginTop: "1.5rem",
          marginBottom: "1rem",
          marginLeft: "0.5rem",
          marginRight: "0.5rem",
        }}
      >
        <Card.Header as="h3" className="text-center">
          Unit {unit?.order}: {unit?.name}
        </Card.Header>
        <Card.Body className="text-justify">
          <Card.Text className="fs-4">{unit?.content}</Card.Text>
        </Card.Body>
        {user === "admin" && (
          <NavigationButton
            className="d-flex justify-content-center"
            to={`/unit/update/${courseId}/${levelId}/${id}`}
            label="Edit"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          />
        )}
      </Card>
    </Container>
  );
};
