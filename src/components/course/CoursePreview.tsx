import React, { useEffect } from "react";
import { useGet } from "../hooks/useGet.ts";
import { Course, Level, Topic } from "../types";
import "./../../index.css";
//import { LevelPreview } from "../level/LevelFindOne";
import { DateComponent } from "../Utils/date.tsx";
import { NavigationButton } from "../Buttons/NavigationButton.tsx";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";
import { Topics } from "../topic/Topics.tsx";
import Container from "react-bootstrap/Container";

interface CoursePreviewProps {
  id: number;
  view?: number;
}

export const CoursePreview: React.FC<CoursePreviewProps> = ({ id, view }) => {
  const {
    data: course,
    loading,
    error,
    fetchData,
  } = useGet<Course>(`/api/courses/${id}`);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;
  return (
    <Container>
      <Card.Header as="h5">{course?.title}</Card.Header>
      <Card.Body>
        <Card.Text style={{ textAlign: "left" }}>
          <strong>Created at:</strong>{" "}
          <DateComponent
            style={{ display: "inline-block" }}
            date={course?.createdAt}
          />
        </Card.Text>
        <Card.Text style={{ textAlign: "left" }}>
          <strong>Price:</strong> ${course?.price}
        </Card.Text>
        <Card.Text style={{ textAlign: "left" }}>
          <strong>Topics:</strong>
          <br />
          <br />
          <Topics selectedTopics={course?.topics} />
        </Card.Text>
        <br />
        {view === 1 ? (
          <NavigationButton to={`/course/update/${course?.id}`} label="Edit" />
        ) : view === 2 ? (
          <NavigationButton
            to={`/inDevelopment/Purchase Course`}
            label="Purchase Course"
            variant="success"
          />
        ) : view === 3 ? (
          <NavigationButton
            to={`/inDevelopment/Course`}
            label="View"
            variant="success"
          />
        ) : null}
        <br />
      </Card.Body>
    </Container>
  );
};
