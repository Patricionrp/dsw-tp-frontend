import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../hooks";
import { Course } from "../types";
// react-bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
//
import { Topics } from "../topic/Topics";
import { useSelectedTopics } from "./hooks/useSelectedTopics";
import {
  validateTitle,
  validatePrice,
  validateTopics,
} from "./validations/courseValidate";
import { Loading, Error } from "./../common";

export const CourseCreate = () => {
  const { loading, error, create } = usePost<Course>("/api/courses/");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { selectedTopics, selectedTopicsIds, handleSelectTopic } =
    useSelectedTopics(); // Usa el hook para manejar los temas seleccionados

  const [formErrors, setFormErrors] = useState<{
    title?: string;
    price?: string;
    topics?: string;
  }>({});

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
    const titleError = validateTitle(title);
    const priceError = validatePrice(price);
    const topicsError = validateTopics(selectedTopics);

    if (titleError || priceError || topicsError) {
      setFormErrors({
        title: titleError,
        price: priceError,
        topics: topicsError,
      });
      return;
    }

    const confirmed = window.confirm(
      `Do you want to create the course: "${title}"?`
    );
    if (confirmed) {
      const newCourse: Course = {
        title: title,
        price: parseFloat(price),
        topics: selectedTopicsIds,
      };
      create(newCourse).then((data) => {
        if (data.courseCreated.id) {
          console.log(
            `Course ${title} was created with ID ${data.courseCreated.id}.`
          );
          navigate(`/course/${data.courseCreated.id}`);
        } else {
          console.error("Error: No ID was received for the created course.");
          alert("There was an error creating the course. Please try again.");
        }
      });
    } else {
      console.log(`Creación del curso ${title} cancelada.`);
    }
  };
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Container className="course">
      <h2>Create a Course</h2>
      <hr />
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
              isInvalid={!!formErrors.title}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="0000.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              isInvalid={!!formErrors.price}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.price}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>

        <h5 className="mb-3" style={{ textAlign: "left" }}>
          Selected Topics:
        </h5>
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
        <Topics
          selectedTopics={selectedTopics}
          onSelectTopic={handleSelectTopic}
        />
        <div className="d-flex justify-content-center">
          <Button variant="success" onClick={handleClick} className="mt-4">
            Create Course
          </Button>
        </div>
      </Card>
    </Container>
  );
};
