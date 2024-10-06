import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { Course, Topic } from "../types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import { NavigationButton } from "../Buttons/NavigationButton.tsx";
import { Topics } from "../topic/Topics";

export const CourseCreate = () => {
  const { loading, error, create } = usePost<Course>("/api/courses/");
  const [title, setTitle] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("");
  //const [courseId, setCourseId] = useState<number | null>(null); // Para manejar el ID del curso creado
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  let topics: Topic[];
  // Para poner el cursor sobre el input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (loading) {
      console.log("loading...");
    }
    if (error) {
      console.log(`error ${error}`);
    }
  }, [loading, error]);

  const handleClick = () => {
    const confirmed = window.confirm(`¿Desea crear el curso: "${title}"?`);
    if (confirmed) {
      const newCourse: Course = {
        title: title,
        price: parseFloat(price),
        topics: selectedTopicsIds,
      };
      create(newCourse).then((fetchData) => {
        if (data.courseCreated.id) {
          console.log(
            `El curso ${title} fue creado con ID ${data.courseCreated.id}.`
          );
          navigate(`/course/${data.courseCreated.id}`);
        } else {
          console.log(data.courseCreated);
          console.error("Error: No se recibió un ID del curso creado.");
          alert("Hubo un error al crear el curso. Intente nuevamente.");
        }
        //console.log(`El curso ${title} fue creado con ID ${createdCourse?.id}.`);
        //navigate(`/course/${createdCourse.id}`);
      });
    } else {
      console.log(`Creación del curso ${title} cancelada.`);
    }
  };

  // Manejo de topics
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const [selectedTopicsIds, setSelectedTopicsIds] = useState<number[]>([]);

  const handleSelectTopic = (topic: Topic) => {
    if (selectedTopics.some((t) => t.id === topic.id)) {
      setSelectedTopics(selectedTopics.filter((t) => t.id !== topic.id));
      setSelectedTopicsIds(selectedTopicsIds.filter((id) => id !== topic.id));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
      setSelectedTopicsIds([...selectedTopicsIds, topic.id]);
    }
  };

  return (
    <Container className="course">
      <h2>Create a Course</h2>
      <hr></hr>
      <Card body className="mb-4">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              ref={inputRef}
              type="text"
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="0000.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
        </Form>

        <h5 className="mb-3" style={{ textAlign: "left" }}>
          Selected Topics:
        </h5>

        {/* Topics seleccionados */}
        <div className="d-flex flex-wrap mb-4">
          {selectedTopics.map((topic) => (
            <Badge
              key={topic.id}
              pill
              bg="primary"
              text="white"
              className="me-2 mb-2"
              style={{
                cursor: "pointer",
                borderRadius: "20px",
                padding: "10px 15px",
              }}
              onClick={() => handleSelectTopic(topic)}
            >
              {topic.description}
            </Badge>
          ))}
        </div>

        <h5 className="mb-3" style={{ textAlign: "left" }}>
          Available Topics:
        </h5>
        {/* Sección Topics */}
        <Topics
          selectedTopics={selectedTopics}
          onSelectTopic={handleSelectTopic}
        />

        <Button variant="primary" onClick={handleClick} className="mt-4">
          Create Course
        </Button>
      </Card>

      <Row className="justify-content-center">
        <Col xs="auto">
          <NavigationButton to={`/course/list`} label={`Back to Courses`} />
        </Col>
        <Col xs="auto">
          <NavigationButton to={`/`} label={`Back to Mainpage`} />
        </Col>
      </Row>
    </Container>
  );
};
