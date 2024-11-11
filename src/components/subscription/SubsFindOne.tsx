import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGet } from "../hooks/useGet.ts";
import { Subscription, Unit } from "./../types";
import "./../../index.css";
import { UnitPreview } from "../unit/Unit.tsx";
import { NavigationButton } from "../buttons/NavigationButton.tsx";
import { Card } from "react-bootstrap";

interface SubscriptionPreviewProps {
  id: number;
}

export const SubscriptionGetOne = () => {
  const { id } = useParams();
  const {
    data: subscription,
    loading,
    error,
    fetchData,
  } = useGet<Subscription>(`/api/subscriptions/${id}`);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Container>
      <Card>
        <Row>
          <Col>
            <h5>Course: {subscription?.course?.title}</h5>
          </Col>
        </Row>

        <Row>
          <Col>
            <h4>
              Subscription {subscription?.order}: {subscription?.name}
            </h4>
          </Col>
        </Row>
        <Row>
          <p>{subscription?.description}</p>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              {Array.isArray(subscription?.units) &&
              subscription?.units.length > 0 ? (
                subscription?.units.map((unit: Unit) => (
                  <UnitPreview id={unit.id} />
                ))
              ) : (
                <p>No units available</p>
              )}
            </ListGroup>
          </Col>
        </Row>

        <Row>
          <NavigationButton
            to={`/unit/create/${subscription?.name}/${subscription?.id}`}
            label="Add unit"
          />
        </Row>

        <br />
        <Row className="justify-content-center">
          <Col md={2}>
            <NavigationButton
              to="/subscription/update"
              label="Edit subscription"
              variant="success"
            />
          </Col>
          <Col md={2}>
            <NavigationButton
              to={`/course/${subscription?.course?.id}`}
              label="Back to Course"
              variant="secondary"
            />
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export const SubscriptionPreview: React.FC<SubscriptionPreviewProps> = ({
  id,
}) => {
  const {
    data: subscription,
    loading,
    error,
    fetchData,
  } = useGet<Subscription>(`/api/subscriptions/${id}`);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Card style={{ borderRadius: "20px" }}>
      <Row>
        <Col>
          <h4>{subscription?.description}</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Price: {subscription?.price}</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            <h4>Duration: {subscription?.duration}</h4>
          </ListGroup>
        </Col>
      </Row>
      {/* aca deberia hacer una validacion por tipo de usuario (en member deberia poner un purchase)*/}
      <NavigationButton
        to={`/subscription/update/${subscription?.id}`}
        label="Edit"
      />
    </Card>
  );
};
