import React, { useState } from "react";
import { Container, Tab, Tabs, Card, Button, Form } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { CourseCreate } from "./../../course/CourseCreate";
import { CourseList } from "./../../course/CourseList";
import { TopicCreate } from "./../../topic/TopicCreate";
import { TopicList } from "./../../topic/TopicList";

export const AdminBody: React.FC = () => {
  return <Outlet />;
};
