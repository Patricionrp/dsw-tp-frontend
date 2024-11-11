import { CoursePreview } from "./CoursePreview.tsx";
import { useGet } from "./../hooks";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Course } from "../types.tsx";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Loading, Error } from "./../common";

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

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  let isActive: boolean;
  switch (view) {
    case 1:
      isActive = true;
      break;
    case 2:
      isActive = false;
      break;
  }

  return (
    <Container fluid style={{ marginTop: "2rem" }}>
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
                      <CoursePreview id={course.id} />
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
