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

interface CourseGetOneProps {
  id: number;
}

export const CourseGetOne: React.FC<CourseGetOneProps> = ({ id }) => {
  //***********************
  // tipo de usuario harcodeado
  const userType = true ? "admin" : "member";
  //**********************************
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
      <br></br>
      <Card>
        <Card>
          <Card.Header as="h3">{course?.title}</Card.Header>
        </Card>

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
          <Card>
            <h3 style={{ textAlign: "left" }}>Levels:</h3>
            <br />
            <ListGroup>
              {Array.isArray(course?.levels) && course?.levels.length > 0 ? (
                course?.levels.map((level: Level, index: number) => (
                  <ListGroup.Item key={level.id}>
                    {index + 1} - {level.title}
                  </ListGroup.Item>
                ))
              ) : (
                <p>No levels available</p>
              )}
            </ListGroup>
          </Card>
          <br />
          <NavigationButton
            to={`/inDevelopment/Purchase Course`}
            label="Purchase Course"
            variant="success"
          />
        </Card.Body>
      </Card>
      <br></br>
      <NavigationButton
        style={{ backgroundColor: "#000", color: "#fff" }}
        to={`/course/list`}
        label="Back to courses"
      />
    </Container>
  );
};
