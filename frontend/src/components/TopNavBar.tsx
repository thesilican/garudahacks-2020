import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { LoginState } from "../types";

type TopNavBarProps = {
  login: LoginState | null;
  onLogout: () => void;
};

export default function TopNavBar(props: TopNavBarProps) {
  const history = useHistory();
  const location = useLocation();
  function handleLogoutClick() {
    props.onLogout();
    history.push("/");
  }
  const variant = location.pathname === "/map" ? "dark" : "light";
  const background = location.pathname === "/map" ? "dark" : "light";

  return (
    <Navbar
      className="TopNavBar"
      variant={variant}
      bg={background}
      sticky="top"
    >
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
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        {props.login ? (
          <Nav>
            <Navbar.Text>
              <small>Signed in as {props.login.hospital.name}</small>
            </Navbar.Text>
            <Nav.Link href="" onClick={handleLogoutClick}>
              Logout
            </Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
          </Nav>
        )}
        {/* {props.login ? (
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
              variant={variant}
              onClick={handleLoginClick}
            >
              Login
            </Button>
            <Button variant={variant} onClick={handleSignupClick}>
              Signup
            </Button>
          </Form>
        )} */}
      </Navbar.Collapse>
    </Navbar>
  );
}
