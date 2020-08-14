import React from "react";
import { Button, Form, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";

type TopNavBarProps = {};

export default function TopNavBar(props: TopNavBarProps) {
  const history = useHistory();
  function handleLoginClick() {
    history.push("/login");
  }
  function handleSignupClick() {
    history.push("/signup");
  }

  return (
    <Navbar className="TopNavBar" variant="dark" bg="dark" sticky="top">
      <Navbar.Brand href="/">APPNAME</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link href="/map">Map</Nav.Link>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        </Nav>
        <Form inline>
          <Button
            className="mr-3"
            variant="outline-light"
            onClick={handleLoginClick}
          >
            Login
          </Button>
          <Button variant="outline-light" onClick={handleSignupClick}>
            Signup
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
