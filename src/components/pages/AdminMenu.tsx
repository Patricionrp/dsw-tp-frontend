import React, { useState } from "react";
import { Container, Tab, Tabs, Card } from "react-bootstrap";
import { AdminBody } from "./../Layouts/Admin/Body";
import { AdminHead } from "./../Layouts/Admin/Head";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export function AdminMenu() {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <Container className="mt-5">
      <AdminHead />
      <Container className="mt-5">
        <AdminBody />
      </Container>
    </Container>
  );
}
