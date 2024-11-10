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
    <Container style={{ paddingTop: "70px" }}>
      {role === "admin" ? <AdminHead /> : <MemberHead />}

      <Card className="mt-6" style={{ marginTop: "70px" }}>
        <PageBody />
      </Card>
    </Container>
  );
}
