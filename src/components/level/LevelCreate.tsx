import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { usePost } from "./../hooks/usePost";
import { Level, Unit } from "./../types";
import { NavigationButton } from "../Buttons/NavigationButton.tsx";
import { UnitGetOne } from "../unit/UnitFindOne.tsx";

export const LevelCreate = () => {
  const { loading, error, create } = usePost<Level>("/api/levels");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { id, title } = useParams();
  const courseId = parseInt(id!);

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
      console.log("error...");
    }
  }, [loading, error]);

  const handleClick = () => {
    const confirmed = window.confirm(`¿Desea crear el level: "${name}"?`);
    if (confirmed) {
      const newLevel: Level = {
        name: name,
        description: description,
        course: courseId,
      };
      create(newLevel).then((data) => {
        if (data.createdLevel.id) {
          console.log(`Level ${name} was created ${data.createdLevel.id}.`);
          navigate(`/level/${data.createdLevel.id}`);
        } else {
          console.log(data.createdLevel);
          console.error("Error: No ID was received for the created level.");
          alert("There was an error creating the level. Please try again.");
        }
      });
    }
  };

  return (
    <Container className="mt-4">
      <h1>Course: {title}</h1>
      <h2>Create a Level</h2>

      <Form.Group className="mb-3" controlId="formLevelName">
        <Form.Control
          ref={inputRef}
          type="text"
          placeholder="Level name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Control
        as="textarea"
        rows={3}
        placeholder={`Description`}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          textAlign: "left",
          paddingTop: "10px",
          height: "auto",
          width: "100%",
          resize: "vertical",
          minHeight: "120px",
          overflow: "hidden",
        }}
      />

      <br />
      <Button variant="success" onClick={handleClick}>
        Create
      </Button>
      <br />
      <br />
      <NavigationButton to={`/course/${id}`} label="Back to Course" />
    </Container>
  );
};
