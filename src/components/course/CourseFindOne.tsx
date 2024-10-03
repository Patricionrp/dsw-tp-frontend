import React, { useEffect } from "react";
import { useGet } from "../hooks/useGet";
import { Course, Level, Topic } from "../types";
import "./../../index.css";
import { LevelGetOne } from "../level/LevelFindOne";
import { DateComponent } from "../date";
import { NavigationButton } from "../Buttons/NavigationButton.tsx";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";
import { Topics } from "../topic/Topics.tsx";

//el add topic y add level por ahi lo tendriamos que poner solo en el edit

export const CourseGetOne: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: course,
    loading,
    error,
    fetchData,
  } = useGet<Course>(`/api/courses/${id}`);
  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  if (error) return <Alert variant="danger">Error: {error}</Alert>;
  return (
    <Card className="my-4">
      <Card.Header as="h3">{course?.title}</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong style={{ display: "inline-block", marginRight: "10px" }}>
            Created at:
          </strong>{" "}
          <DateComponent
            style={{ display: "inline-block" }}
            date={course?.createdAt}
          />
        </Card.Text>

        <Card.Text>
          <strong>Price:</strong> ${course?.price}
        </Card.Text>

        <Card.Text>
          <strong>Topics:</strong>
          <Topics selectedTopics={course?.topics} />
        </Card.Text>

        <Card.Text>
          <strong>Levels:</strong>
          <ListGroup>
            {Array.isArray(course?.levels) && course?.levels.length > 0 ? (
              course?.levels.map((level: Level, index: number) => (
                <ListGroup.Item key={level.id}>
                  <h5>Level {index + 1}</h5>
                  <LevelGetOne id={level.id} />
                </ListGroup.Item>
              ))
            ) : (
              <p>No levels available</p>
            )}
          </ListGroup>
          <NavigationButton
            to={`/level/create/${course?.id}`}
            label="Add Level"
          />
        </Card.Text>

        <div className="d-flex justify-content-between mt-4">
          <NavigationButton to={`/course/update/${course?.id}`} label="Edit" />
        </div>
      </Card.Body>
    </Card>
  );
};
