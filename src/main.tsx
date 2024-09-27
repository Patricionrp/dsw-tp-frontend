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
import { LevelFindOne } from "./components/level/LevelFindOne.tsx";
import { LevelUpdate } from "./components/level/LevelUpdate.tsx";

import { UnitCreate } from "./components/unit/UnitCreate.tsx";
import { UnitList } from "./components/unit/UnitList.tsx";
import { UnitFindOne } from "./components/unit/UnitFindOne.tsx";
import { UnitUpdate } from "./components/unit/UnitUpdate.tsx";

import { CourseCreate } from "./components/course/CourseCreate.tsx";
import { CourseList, CourseFindAll } from "./components/course/CourseList.tsx";
import { CourseFindOne } from "./components/course/CourseFindOne.tsx";
import { CourseUpdate } from "./components/course/CourseUpdate.tsx";

import { MainPage } from "./components/pages/MainPage.tsx";
import { AdminMenu } from "./components/pages/AdminMenu.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "topics/list",
        element: <TopicList />,
      },
      {
        path: "topics/create",
        element: <TopicCreate />,
      },
      {
        path: "courses/list",
        element: <CourseFindAll />,
      },
      {
        path: "courses/create",
        element: <CourseCreate />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
