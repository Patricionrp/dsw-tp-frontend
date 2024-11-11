import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { CourseList, CourseSelector } from "../../course";
import { NavigationButton } from "../../buttons/NavigationButton.tsx";
import { Card } from "react-bootstrap";
import { MyCourseList } from "../../course/MyCourseList.tsx";
import { getUser } from "../../Utils/getUser.ts";
import { useAdminRedirect } from "../../hooks/useAdminRedirect.ts";

export const MyCourseListPage = () => {
  useAdminRedirect("course/list");
  const user = getUser();
  return (
    <Container style={{ width: "100%" }}>
      <h2>My Courses</h2>
      <Card>
        <MyCourseList id={user.id} />
      </Card>
      <Container
        fluid
        className="bg-light text-center p-3"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <NavigationButton to={`/`} label="Back to Mainpage" />
      </Container>
    </Container>
  );
};
