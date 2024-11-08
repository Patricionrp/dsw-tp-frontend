import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";

import {
  CourseListPage,
  CoursePage,
  CourseCreatePage,
  TopicCreatePage,
  TopicListPage,
  InDevelopmentPage,
  LoginPage,
  //MainPage,
  RegisterPage,
} from "./components/pages";
import PrivateRoute from "./components/Utils/privateRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "topic/list",
        element: <PrivateRoute element={<TopicListPage />} />,
      },
      {
        path: "topic/create",
        element: <PrivateRoute element={<TopicCreatePage />} />,
      },
      {
        path: "course/list",
        element: <PrivateRoute element={<CourseListPage />} />,
      },
      {
        path: "course/create",
        element: <PrivateRoute element={<CourseCreatePage />} />,
      },
      {
        path: "course/:id",
        element: <PrivateRoute element={<CoursePage />} />,
      },
      {
        path: "/inDevelopment/:title",
        element: <PrivateRoute element={<InDevelopmentPage />} />,
      },
    ],
  },
]);

export default router;
