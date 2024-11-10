import { CoursePreview } from "./CoursePreview.tsx";
import { useGet } from "./../hooks";
import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import { Course } from "../types.tsx";
import { Col, Container, Row } from "react-bootstrap";
interface CourseListProps {
  view: number;
}

export const CourseList: React.FC<CourseListProps> = ({ view }) => {
  const {
    data: courses,
    error,
    loading,
    fetchData,
  } = useGet<Course>(`/api/courses`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  let isActive: boolean;
  switch (view) {
    case 1:
      isActive = true;
      break;
    case 2:
      isActive = false;
      break;
  }
  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <p>Error: {error}</p>;
  return (
    <Container fluid>
      {Array.isArray(courses) && courses.length > 0 ? (
        <Table>
          <tbody>
            {courses
              .filter((course) => view === 3 || course.isActive === isActive)
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
                        {view === 1 ? (
                          <CoursePreview id={course.id} view={1} />
                        ) : view === 2 ? (
                          <CoursePreview id={course.id} view={2} />
                        ) : null}
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
