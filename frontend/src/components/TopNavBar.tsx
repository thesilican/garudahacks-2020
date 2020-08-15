import React from "react";
import { Button, Form, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { LoginState } from "../types";
import logo from "../../assets/logo.png";

type TopNavBarProps = {
  login: LoginState | null;
  onLogout: () => void;
};

export default function TopNavBar(props: TopNavBarProps) {
  const history = useHistory();
  function handleLoginClick() {
    history.push("/login");
  }
  function handleSignupClick() {
    history.push("/signup");
  }
  function handleLogoutClick() {
    props.onLogout();
    history.push("/");
  }

  return (
    <Navbar className="TopNavBar" variant="dark" bg="dark" sticky="top">
      <Navbar.Brand href="/">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />{" "}
        Hot Spot
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link href="/map">Map</Nav.Link>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        </Nav>
        {props.login ? (
          <Form inline>
            <Navbar.Text className="mr-3">
              {props.login.hospital.name}
            </Navbar.Text>
            <Button variant="outline-light" onClick={handleLogoutClick}>
              Logout
            </Button>
          </Form>
        ) : (
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
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
