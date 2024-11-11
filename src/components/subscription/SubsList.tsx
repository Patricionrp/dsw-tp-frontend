import { useEffect } from "react";

import { useGet } from "../hooks/useGet.ts";
import { Subscription } from "./../types";
import "./../../index.css";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { NavigationButton } from "../buttons/NavigationButton.tsx";
import { SubscriptionPreview } from "./SubsFindOne.tsx";
import { Col, Row } from "react-bootstrap";

export const SubscriptionList = () => {
  const {
    data: subscriptions,
    error,
    fetchData,
  } = useGet<Subscription>(`/api/subscriptions`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container className="mt-3">
      <h2>Subscriptions</h2>

      {/* Botón para agregar un nuevo nivel */}
      <NavigationButton
        to="/subscription/create"
        label="Add Subscription"
        style={{ marginBottom: "1rem" }}
      />

      <Row>
        {Array.isArray(subscriptions) ? (
          subscriptions.map((subscription) => (
            <Col key={subscription.id} md={3}>
              <ListGroup.Item>
                <SubscriptionPreview id={subscription.id} />
              </ListGroup.Item>
            </Col>
          ))
        ) : (
          <p>No subscriptions available</p>
        )}
      </Row>
    </Container>
  );
};
