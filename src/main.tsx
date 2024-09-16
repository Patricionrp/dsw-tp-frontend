import React from 'react'
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import {App} from './App'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

import { TopicCreate } from './components/topic/TopicCreate.tsx';
import { TopicList } from './components/topic/TopicList.tsx';
import { TopicFindOne } from './components/topic/TopicFindOne.tsx';
import { TopicUpdate } from './components/topic/TopicUpdate.tsx';

import { LevelCreate } from './components/level/LevelCreate.tsx';
import { LevelList } from './components/level/LevelList.tsx';
import { LevelFindOne } from './components/level/LevelFindOne.tsx';
import { LevelUpdate } from './components/level/LevelUpdate.tsx';

import { UnitCreate } from './components/unit/UnitCreate.tsx';
import { UnitList } from './components/unit/UnitList.tsx';
import { UnitFindOne } from './components/unit/UnitFindOne.tsx';
import { UnitUpdate } from './components/unit/UnitUpdate.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/topic",
    element: <TopicList />,
  },
  {
    path: "/topic/create",
    element: <TopicCreate />,
  },
  
  {
    path: "/topic/:id",
    element: <TopicFindOne />,
  },
  {
    path: "/topic/update/:id",
    element: <TopicUpdate />,
  },
  {
    path: "/level",
    element: <LevelList />,
  },
  {
    path: "/level/create",
    element: <LevelCreate />,
  },
  
  {
    path: "/level/:id",
    element: <LevelFindOne />,
  },
  {
    path: "/level/update/:id",
    element: <LevelUpdate />,
  },
  {
    path: "/unit",
    element: <UnitList />,
  },
  {
    path: "/unit/create",
    element: <UnitCreate />,
  },
  
  {
    path: "/unit/:id",
    element: <UnitFindOne />,
  },
  {
    path: "/unit/update/:id",
    element: <UnitUpdate />,
  }


]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);