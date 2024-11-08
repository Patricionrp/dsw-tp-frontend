import React, { useEffect } from "react";
import { useGet } from "../../hooks/useGet.ts";
import { Course, Level } from "./../../types";
import { LevelPreview } from "./../../level/LevelFindOne";
import { DateComponent } from "./../../Utils/date";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";
import { Topics } from "./../../topic/Topics.tsx";
import { Container } from "react-bootstrap";
import { NavigationButton } from "../../Buttons/NavigationButton.tsx";
import { CourseGetOne } from "../../course";

//el add topic y add level por ahi lo tendriamos que poner solo en el edit

export const CoursePage: React.FC = () => {
  //***********************
  // tipo de usuario harcodeado
  let userType = true ? "admin" : "member";
  //**********************************
  const { id } = useParams<{ id: string }>();
  const {
    data: course,
    loading,
    error,
    fetchData,
  } = useGet<Course>(`/api/courses/${id}`);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;
  return (
    <Card>
      <CourseGetOne id={id} />
      <NavigationButton
        style={{ backgroundColor: "#000", color: "#fff" }}
        to={`/course/list`}
        label="Back to courses"
      />
    </Card>
  );
};
