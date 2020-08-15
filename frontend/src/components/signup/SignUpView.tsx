import { Coordinate, Map, Marker } from "@thesilican/react-google-maps";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { API } from "../../api";
import { LoginState } from "../../types";

type SignUpViewProps = {
  onLogin: (info: LoginState) => void;
};

export default function SignUpView(props: SignUpViewProps) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addressMarker, setAddressMarker] = useState(null as Coordinate | null);
  async function getAddress(address: string) {
    const res = await API.location({ address });
    setAddressMarker(res.location);
  }
  const [getAddressDebounced] = useDebouncedCallback(getAddress, 500);

  function handleAddressInput(address: string) {
    setAddress(address);
    if (address !== "") getAddressDebounced(address);
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const hospital = { address, name };
    const res = await API.signup({
      email,
      password,
      hospital,
    });
    if (res.status === "email-taken") {
      alert("Sorry, that email has been taken");
    } else if (res.status === "ok") {
      props.onLogin({
        email,
        hospital,
        token: res.token,
      });
      history.push("/dashboard");
    }
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
                onChange={(e) => handleAddressInput(e.target.value)}
              ></Form.Control>
              <div className="map-wrapper">
                <Map center={addressMarker ?? undefined}>
                  {addressMarker ? <Marker position={addressMarker} /> : null}
                </Map>
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
            <Button type="submit">Sign up</Button>
          </Form>
        </Col>
        <Col md={3} lg={4}></Col>
      </Row>
    </Container>
  );
}
