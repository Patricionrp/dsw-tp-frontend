import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { TopicCreate } from "./components/topic/TopicCreate.tsx";
import { TopicList } from "./components/topic/TopicList.tsx";
import { TopicFindOne } from "./components/topic/TopicFindOne.tsx";
import { TopicUpdate } from "./components/topic/TopicUpdate.tsx";

import { LevelCreate } from "./components/level/LevelCreate.tsx";
import { LevelList } from "./components/level/LevelList.tsx";
import { LevelGetOne } from "./components/level/LevelFindOne.tsx";
import { LevelUpdate } from "./components/level/LevelUpdate.tsx";

import { UnitCreate } from "./components/unit/UnitCreate.tsx";
import { UnitList } from "./components/unit/UnitList.tsx";
import { UnitFindOne } from "./components/unit/UnitFindOne.tsx";
import { UnitUpdate } from "./components/unit/UnitUpdate.tsx";

import { CourseCreate } from "./components/course/CourseCreate.tsx";
import { CourseList, CourseFind } from "./components/course/CourseList.tsx";
import {
  CourseFindOne,
  CourseGetOne,
} from "./components/course/CourseFindOne.tsx";
import { CourseUpdate } from "./components/course/CourseUpdate.tsx";

import { MainPage } from "./components/pages/MainPage.tsx";
import { AdminMenu } from "./components/pages/AdminMenu.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { SubsCreate } from "./components/sunscription/SubsCreate.tsx";
import { SubscriptionList } from "./components/sunscription/SubsList.tsx";
import { InDevelopment } from "./components/inDevelopment.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "topic/list",
        element: <TopicList />,
      },
      {
        path: "topic/create",
        element: <TopicCreate />,
      },
      {
        path: "course/list",
        element: <CourseFind />,
      },
      {
        path: "course/create",
        element: <CourseCreate />,
      },
      {
        path: "course/:id",
        element: <CourseGetOne />,
      },
      {
        path: "level/create/:courseTitle/:id",
        element: <LevelCreate />,
      },
      {
        path: "level/:id",
        element: <LevelGetOne />,
      },
      {
        path: "level/list",
        element: <LevelList />,
      },
      {
        path: "unit/create/:levelName/:id",
        element: <UnitCreate />,
      },
      {
        path: "unit/:id",
        element: <UnitFindOne />,
      },
      {
        path: "unit/list",
        element: <UnitList />,
      },
      {
        path: "subscription/list",
        element: <SubscriptionList />,
      },
      {
        path: "subscription/create",
        element: <SubsCreate />,
      },
      {
        path: "subscription/:id",
        //element: <Subscription />,
      },
      {
        path: "/inDevelopment/:title",
        element: <InDevelopment />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
