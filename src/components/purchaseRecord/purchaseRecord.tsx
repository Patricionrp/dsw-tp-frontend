import React from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { DateComponent } from "../common/utils/date.tsx";
import { Course, User } from "../types.tsx";
interface PurchaseRecordPreviewProps {
  id: number | undefined;
  user: User | number | undefined;
  course: Course | undefined | number;
  purchaseAt: Date | undefined;
  totalAmount: number | undefined;
}

export const PurchaseRecordPreview: React.FC<PurchaseRecordPreviewProps> = ({
  id,
  user,
  course,
  purchaseAt,
  totalAmount,
}) => {
  const name = typeof user === "number" ? "User not available" : user?.name;
  const title =
    typeof course === "number" ? "Course not available" : course?.title;
  return (
    <Card className="mb-3">
      <Card.Header>Purchase ID: {id}</Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <strong>User:</strong> {name}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Course:</strong> {title}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Purchased At:</strong>{" "}
                <DateComponent date={purchaseAt} />
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <strong>Total Amount:</strong> ${totalAmount?.toFixed(2)}
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
        <Button variant="primary" className="mt-3">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};
