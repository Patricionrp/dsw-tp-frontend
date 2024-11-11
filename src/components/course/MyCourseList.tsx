import { CoursePreview } from "./CoursePreview.tsx";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Col, Container, Row } from "react-bootstrap";
import { getPurchasedCourses } from "../Utils/getPurchasedCourses.ts";
import { Loading, Error } from "./../common";
interface MyCourseListProps {
  id: number;
}

export const MyCourseList: React.FC<MyCourseListProps> = ({ id }) => {
  const [state, setState] = useState({
    loading: true,
    error: null as string | null,
    courses: [] as any[],
  });

  useEffect(() => {
    async function fetchCourses() {
      const result = await getPurchasedCourses(id);
      setState(result); 
    }

    fetchCourses();
  }, [id]);

  const { loading, error, courses } = state;

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
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
