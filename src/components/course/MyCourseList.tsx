import { CoursePreview } from "./CoursePreview.tsx";
import { useGet } from "../hooks/useGet.ts";
import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import { User } from "../types.tsx";
import { Col, Container, Row } from "react-bootstrap";
interface MyCourseListProps {
  id: number;
}

export const MyCourseList: React.FC<MyCourseListProps> = ({ id }) => {
  return (
    <Container fluid>
      {Array.isArray(courses) && courses.length > 0 ? (
        <Table>
          <tbody>
            {courses
              .reduce((acc, course, index) => {
                if (index % 3 === 0) acc.push([]);
                acc[acc.length - 1].push(course);
                return acc;
              }, [])
              .map((rowCourses, rowIndex) => (
                <Row key={rowIndex} className="mb-3">
                  {rowCourses.map((course) => (
                    <Col
                      key={course.id}
                      xs={12}
                      sm={4}
                      md={4}
                      lg={4}
                      className="d-flex justify-content-center"
                    >
                      <div className="p-2 border rounded">
                        <CoursePreview id={course.id} view={3} />
                      </div>
                    </Col>
                  ))}
                </Row>
              ))}
          </tbody>
        </Table>
      ) : (
        <p>No courses available</p>
      )}
    </Container>
  );
};
