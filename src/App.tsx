import { useState } from "react";
import "./App.css";
/* import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CourseCreate } from "./components/course/CourseCreate";
import { CourseList } from "./components/course/CourseList";
import { TopicCreate } from "./components/topic/TopicCreate";
import { TopicList } from "./components/topic/TopicList";
import { MainPage } from "./components/pages/MainPage"; */
import { AdminMenu } from "./components/pages/AdminMenu.tsx";

export function App() {
  return <AdminMenu />;
}
