import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { Subscription } from "../types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NavigationButton } from "../Buttons/NavigationButton.tsx";

export const SubsCreate = () => {
  const { loading, error, create } = usePost<Subscription>(
    "/api/subscriptions/"
  );
  const [description, setDescription] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("");
  const [duration, setDuration] = React.useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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
    const confirmed = window.confirm(
      `¿Desea crear el curso: "${description}"?`
    );
    if (confirmed) {
      const newSubscription: Subscription = {
        description: description,
        price: parseFloat(price),
        duration: parseInt(duration),
      };
      create(newSubscription).then((data) => {
        if (data.courseCreated.id) {
          console.log(
            `Subscription  ${description} was created whit id ${data.subscriptionCreated.id}.`
          );
          navigate(`/course/${data.subscriptionCreated.id}`);
        } else {
          console.log(data.subscriptionCreated);
          console.error(
            "Error: No ID was received for the created subscription."
          );
          alert(
            "There was an error creating the subscription. Please try again."
          );
        }
      });
    } else {
      console.log(`Subscription creation  ${description} canceled.`);
    }
  };

  return (
    <Container className="course">
      <h2>Create a Subscription</h2>
      <hr></hr>
      <Card body className="mb-4">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              ref={inputRef}
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
          <Form.Group className="mb-3">
            <Form.Label>Duration {"(days)"}</Form.Label>
            <Form.Control
              ref={inputRef}
              type="text"
              placeholder="00"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </Form.Group>
        </Form>

        <Button variant="primary" onClick={handleClick} className="mt-4">
          Create Subscription
        </Button>
      </Card>

      <Row className="justify-content-center">
        <Col xs="auto">
          <NavigationButton
            to={`/subscription/list`}
            label={`Back to Subscriptions`}
          />
        </Col>
        <Col xs="auto">
          <NavigationButton to={`/`} label={`Back to Mainpage`} />
        </Col>
      </Row>
    </Container>
  );
};
