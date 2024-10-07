import React, { useEffect } from "react";
import { useGet } from "../hooks/useGet";
import { Course, Level, Topic } from "../types";
import "./../../index.css";
import { LevelPreview } from "../level/LevelFindOne";
import { DateComponent } from "../date";
import { NavigationButton } from "../Buttons/NavigationButton.tsx";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";
import { Topics } from "../topic/Topics.tsx";
import { Container } from "react-bootstrap";

//el add topic y add level por ahi lo tendriamos que poner solo en el edit

export const CourseGetOne: React.FC = () => { 
  //***********************
  // tipo de usuario harcodeado
  let userType = true ? "admin" : "member";
  //**********************************
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
        <span className="sr-only"></span>
      </Spinner>
    );
  if (error) return <Alert variant="danger">Error: {error}</Alert>;
  return (
    <>
      <Card className="my-4">
        <Card.Header as="h3">{course?.title}</Card.Header>
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
                    <LevelPreview id={level.id} />
                  </ListGroup.Item>
                ))
              ) : (
                <p>No levels available</p>
              )}
            </ListGroup>
            <br />
            {userType === "admin" && (
              <NavigationButton
                to={`/level/create/${course?.title}/${course?.id}`}
                label="Add Level"
              />
            )}
          </Card>
          <br />
          {userType === "admin" ? (
            <NavigationButton
              to={`/course/update/${course?.id}`}
              label="Edit"
            />
          ) : (
            <NavigationButton
              to={`/inDevelopment/Purchase Course`}
              label="Purchase Course"
              variant="success"
            />
          )}
          <br />
        </Card.Body>
      </Card>{" "}
      <NavigationButton
        style={{ backgroundColor: "#000", color: "#fff" }}
        to={`/course/list`}
        label="Back to courses"
      />
    </>
  );
};
