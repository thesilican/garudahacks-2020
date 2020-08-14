import React, { useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

type LoginViewProps = {};

export default function LoginView(props: LoginViewProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Submit");
  }

  return (
    <Container className="LoginView">
      <Row>
        <Col md={3} lg={4}></Col>
        <Col md={6} lg={4}>
          <Form className="form" onSubmit={handleSubmit}>
            <h1>Log in</h1>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit">Log in</Button>
          </Form>
        </Col>
        <Col md={3} lg={4}></Col>
      </Row>
    </Container>
  );
}
