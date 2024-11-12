import React, { useEffect } from "react";
import { useGet } from "../hooks/useGet.ts";
import { Course, Level } from "../types";
import { DateComponent } from "../Utils/date.tsx";
import { NavigationButton } from "../buttons/NavigationButton.tsx";
import { Topics } from "../topic/Topics.tsx";
import { LevelList } from "../level/LevelList.tsx";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { userType } from "../Utils/userType.ts";
import { Loading, Error } from "./../common";
interface CourseGetOneProps {
  id: string | undefined;
}

export const CourseGetOne: React.FC<CourseGetOneProps> = ({ id }) => {
  const {
    data: course,
    loading,
    error,
    fetchData,
  } = useGet<Course>(`/api/courses/${id}`);

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
        <Card.Header as="h3">{course?.title}</Card.Header>
        <Card.Body>
          <div style={{ textAlign: "left" }}>
            <Card.Text className="fs-4">
              <strong>Created at:</strong>{" "}
              <DateComponent
                style={{ display: "inline-block" }}
                date={course?.createdAt}
              />
            </Card.Text>
            <Card.Text className="fs-4">
              <strong>Price:</strong> ${course?.price}
            </Card.Text>
            <Card.Text className="fs-4">
              <strong>Topics:</strong>
            </Card.Text>
            <Topics selectedTopics={course?.topics} />
            <Card.Text className="fs-4">
              <strong>Levels:</strong>
            </Card.Text>
            <LevelList course={id} />
          </div>
          {user === "admin" && (
            <NavigationButton
              className="d-flex justify-content-center"
              to={`/course/update/${id}`}
              label="Edit"
              style={{ marginTop: "2rem" }}
            />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
