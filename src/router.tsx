import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";

import {
  CoursePage,
  CourseListPage,
  CourseCreatePage,
  CourseUpdatePage,
  MyCourseListPage,
  LevelPage,
  LevelCreatePage,
  LevelUpdatePage,
  UnitPage,
  UnitCreatePage,
  UnitUpdatePage,
  TopicListPage,
  TopicCreatePage,
  LoginPage,
  RegisterPage,
  SubscriptionListPage,
  SubscriptionCreatePage,
  SubscriptionUpdatePage,
  PurchasesRecordPage,
  MyPurchasesPage,
  InDevelopmentPage,
} from "./components/pages";
import { PrivateRoute, AdminRoute } from "./components/common/authentication";

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
    element: <PrivateRoute element={<App />} />,
    children: [
      {
        path: "topic/list",
        element: <AdminRoute element={<TopicListPage />} />,
      },
      {
        path: "topic/create",
        element: <AdminRoute element={<TopicCreatePage />} />,
      },
      {
        path: "course/list",
        element: <PrivateRoute element={<CourseListPage />} />,
      },
      {
        path: "course/create",
        element: <AdminRoute element={<CourseCreatePage />} />,
      },
      {
        path: "course/:id",
        element: <PrivateRoute element={<CoursePage />} />,
      },

      {
        path: "course/update/:id",
        element: <PrivateRoute element={<CourseUpdatePage />} />,
      },
      {
        path: "myCourses",
        element: <PrivateRoute element={<MyCourseListPage />} />,
      },
      {
        path: "level/:courseId/:id",
        element: <PrivateRoute element={<LevelPage />} />,
      },
      {
        path: "level/create/:courseId",
        element: <AdminRoute element={<LevelCreatePage />} />,
      },
      {
        path: "level/update/:courseId/:id",
        element: <AdminRoute element={<LevelUpdatePage />} />,
      },
      {
        path: "unit/:courseId/:levelId/:id",
        element: <PrivateRoute element={<UnitPage />} />,
      },
      {
        path: "unit/create/:courseId/:levelId",
        element: <AdminRoute element={<UnitCreatePage />} />,
      },
      {
        path: "unit/update/:courseId/:levelId/:id",
        element: <AdminRoute element={<UnitUpdatePage />} />,
      },
      {
        path: "coursePurchaseRecords",
        element: <AdminRoute element={<PurchasesRecordPage />} />,
      },
      {
        path: "myPurchases",
        element: <PrivateRoute element={<MyPurchasesPage />} />,
      },
      {
        path: "subscription/list",
        element: <PrivateRoute element={<SubscriptionListPage />} />,
      },
      {
        path: "subscription/create",
        element: <AdminRoute element={<SubscriptionCreatePage />} />,
      },
      {
        path: "subscription/update/:id",
        element: <AdminRoute element={<SubscriptionUpdatePage />} />,
      },
      {
        path: "inDevelopment/:title",
        element: <PrivateRoute element={<InDevelopmentPage />} />,
      },
    ],
  },
]);

export default router;
