import React from "react";
//import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export const PageBody: React.FC = () => {
  return <Outlet />;
};
