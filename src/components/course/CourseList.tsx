import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { Course } from  "../types";
import "./../topic/topic.css";


export const CourseList = () => {
  
  const { data: courses, error, fetchData } = useGet<Course>(`/api/courses`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  //if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="course-list">
      <h2>Courses</h2>
      <button className="add-button">
        <Link to="/course/create">Add Course</Link>
      </button>
      <ul>
        {Array.isArray(courses) ? (
          courses.map((course) => (
            <li key={course.id}>
                <button >
                    <Link to={`/course/${course.id}`}>{course.id} - {course.title}</Link>
                </button>
            </li>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </ul>
      <button><Link to={`/`}>Back to Mainpage</Link></button>
    </div>
  );
};

