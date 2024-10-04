import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { Unit } from "../types";
import { NavigationButton } from "../Buttons/NavigationButton.tsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

export const UnitCreate = () => {
  const { loading, error, create } = usePost<Unit>("/api/levels");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { id, levelName } = useParams();
  const levelId = parseInt(id!);

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
      const newUnit: Unit = {
        name: name,
        //description: description,
        level: levelId,
      };
      create(newUnit).then((data) => {
        if (data.createdUnit.id) {
          console.log(
            `Unit ${name} was created whit ID ${data.createdUnit.id}.`
          );
          navigate(`/unit/${data.createdUnit.id}`);
        } else {
          console.log(data.createdUnit);
          console.error("Error: No ID was received for the created unit.");
          alert("There was an error creating the course. Please try again.");
        }
      });
    }
  };

  return (
    <Container className="mt-4">
      <h1>
        Level {levelId}: {levelName}
      </h1>
      <h2>Create a Unit</h2>

      <Form.Group className="mb-3" controlId="formUnitName">
        <Form.Control
          ref={inputRef}
          type="text"
          placeholder="Unit name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      {/* <Form.Control
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
      /> */}

      <br />
      <Button variant="success" onClick={handleClick}>
        Create
      </Button>
      <br />
      <br />
      <NavigationButton
        to={`/level/${id}`}
        label="Back to Level"
        variant="secondary"
      />
    </Container>
  );
};
