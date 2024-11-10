import React from "react";

import { Container } from "react-bootstrap";
import { LoginForm } from "../authentication/Login.tsx";

export function LoginPage() {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
}
