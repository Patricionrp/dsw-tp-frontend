import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { Course } from "../types";
import "./../../index.css";
import { CourseFindOne, CourseGetOne } from "./CourseFindOne.tsx";
import Table from "react-bootstrap/Table";
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

export const CourseFindAll: React.FC = () => {
  const { data: courses, error, fetchData } = useGet<Course>(`/api/courses`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <ul>
        {Array.isArray(courses) ? (
          courses.map((course) => (
            <li key={course.id}>
              <button>
                <Link to={`/course/${course.id}`}>
                  {course.id} - {course.title}
                </Link>
              </button>
            </li>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </ul>
    </div>
  );
};
