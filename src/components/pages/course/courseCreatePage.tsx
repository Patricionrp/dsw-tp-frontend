import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { CourseCreate } from "../../course/index.ts";
import { NavigationButton } from "../../Buttons/NavigationButton.tsx";

export const CourseCreatePage = () => {
  return (
    <Container>
      <CourseCreate />
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
