import { useEffect } from "react";

import { useGet } from "../common/hooks/useGet.ts";
import { Subscription } from "../types.tsx";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { NavigationButton } from "../common/buttons/index.ts";
import { SubscriptionPreview } from "./subscriptionPreview.tsx";
import { Alert, Card, Col, Row } from "react-bootstrap";
import { Loading, Error } from "../common/utils";

export const SubscriptionList = () => {
  const {
    data: subscriptions,
    error,
    loading,
    fetchData,
  } = useGet<Subscription>(`/api/subscriptions`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Container>
      <Row className="gy-4">
        {Array.isArray(subscriptions) && subscriptions.length > 0 ? (
          subscriptions.map((subscription) => (
            <Col key={subscription.id} md={4} lg={3}>
              <SubscriptionPreview id={subscription.id} />
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info" className="text-center">
              No subscriptions available
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};
