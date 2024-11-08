import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { PageBody } from "../Layouts/Body";
import { AdminHead } from "../Layouts/Admin/Head";
import { MemberHead } from "../Layouts/Member/Head";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Card } from "react-bootstrap";

import { userType } from "../Utils/userType.ts";
export function MainPage() {
  const role = userType();
  return (
    <Container>
      {role === "admin" ? <AdminHead /> : <MemberHead />}
      <MemberHead />
      <Card className="mt-5">
        <PageBody />
      </Card>
    </Container>
  );
}
