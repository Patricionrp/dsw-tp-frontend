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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/topic/create",
    element: <TopicCreate />,
  },
  {
    path: "/topic",
    element: <TopicList />,
  },
  {
    path: "/topic/:id",
    element: <TopicFindOne />,
  },
  {
    path: "/topic/update",
    element: <TopicUpdate />,
  }

]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);