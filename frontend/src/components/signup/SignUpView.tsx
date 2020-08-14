import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Map } from "@thesilican/react-google-maps";

type SignUpViewProps = {};

export default function SignUpView(props: SignUpViewProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Submit");
  }

  return (
    <Container className="SignUpView">
      <Row>
        <Col md={3} lg={4}></Col>
        <Col md={6} lg={4}>
          <Form className="form" onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <Form.Group>
              <Form.Label>Hospital name</Form.Label>
              <Form.Control
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Hospital address</Form.Label>
              <Form.Control
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
              <div className="map-wrapper">
                <Map></Map>
              </div>
            </Form.Group>
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
