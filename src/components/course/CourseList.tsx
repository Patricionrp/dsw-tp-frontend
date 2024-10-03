import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { Course } from "../types";
import "./../../index.css";
import { CourseFindOne, CourseGetOne } from "./CourseFindOne.tsx";
import Table from "react-bootstrap/Table";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const CourseList = () => {
  const { data: courses, error, fetchData } = useGet<Course>(`/api/courses`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="conteiner">
      <h2>Courses</h2>
      <button className="add-button">
        <Link to="/course/create">Add Course</Link>
      </button>
      <Table>
        <tbody>
          {Array.isArray(courses) ? (
            courses.map((course) => (
              <tr key={course.id}>
                <td>
                  <Link to={`/course/${course.id}`}>
                    <CourseGetOne id={course.id} />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <p>No courses available</p>
          )}
        </tbody>
      </Table>
      <button>
        <Link to={`/`}>Back to Mainpage</Link>
      </button>
    </div>
  );
};

export const CourseFind: React.FC = () => {
  const { data: courses, error, fetchData } = useGet<Course>(`/api/courses`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="course-list">
      <Row>
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
            <Col key={course.id} xs={12} sm={6} md={4} className="mb-4">
              <Card style={{ borderRadius: "10px" }}>
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>ID: {course.id}</Card.Text>
                  <Button
                    variant="primary"
                    as={Link}
                    to={`/course/${course.id}`}
                  >
                    Ver Curso
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No courses available</p>
          </Col>
        )}
      </Row>
    </div>
  );
};
