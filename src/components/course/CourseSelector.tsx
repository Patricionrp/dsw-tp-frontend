import React, { useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";

export const CourseSelector = ({ view, setView }) => {
  const [finished, setFinished] = useState(true);
  const [unfinished, setUnfinished] = useState(true);
  const [allSelected, setAllSelected] = useState(true);

  const handleFinishedChange = () => {
    const newFinished = !finished;
    setFinished(newFinished);
    updateView(newFinished, unfinished);
  };

  const handleUnfinishedChange = () => {
    const newUnfinished = !unfinished;
    setUnfinished(newUnfinished);
    updateView(finished, newUnfinished);
  };

  const updateView = (newFinished, newUnfinished) => {
    if (newFinished && newUnfinished) {
      setAllSelected(true);
      setView(3); // Both selected, set to 'All courses selected'
    } else if (!newFinished && !newUnfinished) {
      setAllSelected(false);
      setView(3); // Both deselected, set to 'All courses selected'
    } else if (newFinished) {
      setAllSelected(false);
      setView(1); // Only finished courses selected
    } else if (newUnfinished) {
      setAllSelected(false);
      setView(2); // Only unfinished courses selected
    } else {
      setAllSelected(false);
      setView(null); // No view selected
    }
  };

  return (
    <Container>
      <Form>
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={12} md={4} className="d-flex justify-content-center mb-3">
            <Form.Check
              type="checkbox"
              label="Finished Courses"
              checked={finished}
              onChange={handleFinishedChange}
              className="ms-0"
            />
          </Col>
          <Col xs={12} md={4} className="d-flex justify-content-center mb-3">
            <Form.Check
              type="checkbox"
              label="Unfinished Courses"
              checked={unfinished}
              onChange={handleUnfinishedChange}
              className="ms-0"
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
