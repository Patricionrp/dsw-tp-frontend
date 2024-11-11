import React, { useEffect, useState } from "react";
import { useGet } from "../hooks/useGet.ts";
import { Course, User } from "../types";

import { DateComponent } from "../Utils/date.tsx";
import { NavigationButton } from "../buttons/NavigationButton.tsx";
import Card from "react-bootstrap/Card";

import { Topics } from "../topic/Topics.tsx";
import { getUser } from "../Utils/getUser.ts";
import { checkPurchase } from "../Utils/authentication/checkPurchase.ts";
import { Loading, Error } from "./../common";
import { PurchaseButton } from "../buttons/purchaseCourseButton.tsx";

interface CoursePreviewProps {
  id: number;
}

export const CoursePreview: React.FC<CoursePreviewProps> = ({ id }) => {
  const {
    data: course,
    loading,
    error,
    fetchData,
  } = useGet<Course>(`/api/courses/${id}`);
  const [button, setButton] = useState<number>(2);

  async function determineView(user: User, id: number): Promise<number> {
    let view = 1;
    if (user) {
      console.log("User is:", user);
      if (user.admin) {
        view = 1;
      } else {
        const purchaseStatus = await checkPurchase(user.id, id);
        console.log("Purchase status:", purchaseStatus);
        view = purchaseStatus ? 2 : 3;
      }
    }

    return view;
  }
  useEffect(() => {
    const fetchData = async () => {
      const user = getUser();
      console.log("User:", user);
      if (user) {
        const currentButton = await determineView(user, id);
        setButton(currentButton);
      } else {
        console.log("User is not defined.");
        setButton(3);
      }
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header as="h5">{course?.title}</Card.Header>
      <Card.Body>
        <Card.Text style={{ textAlign: "left" }}>
          <strong>Created at:</strong>{" "}
          <DateComponent
            style={{ display: "inline-block" }}
            date={course?.createdAt}
          />
        </Card.Text>
        <Card.Text style={{ textAlign: "left" }}>
          <strong>Price:</strong> ${course?.price}
        </Card.Text>
        <Card.Text style={{ textAlign: "left" }}>
          <strong>Topics:</strong>
          <br />
          <br />
          <Topics selectedTopics={course?.topics} />
        </Card.Text>
        <br />
        <div className="d-flex justify-content-center">
          {button === 1 ? (
            <NavigationButton
              to={`/course/update/${course?.id}`}
              label="Edit"
            />
          ) : button === 3 ? (
            <PurchaseButton courseId={id} />
          ) : button === 2 ? (
            <NavigationButton
              to={`/Course/${course?.id}`}
              label="View"
              variant="success"
            />
          ) : null}
        </div>
        <br />
      </Card.Body>
    </Card>
  );
};
