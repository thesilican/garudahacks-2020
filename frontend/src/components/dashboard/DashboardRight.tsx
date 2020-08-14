import React from "react";
import { Map } from "@thesilican/react-google-maps";
import { Button, Form } from "react-bootstrap";

type DashboardRightProps = {};

export default function DashboardRight(props: DashboardRightProps) {
  return (
    <div className="DashboardRight">
      <Form inline className="top">
        <Form.Control
          className="mr-2"
          placeholder="Search for location"
        ></Form.Control>
        <Button type="submit">Search</Button>
      </Form>
      <div className="wrapper">
        <Map></Map>
      </div>
      <div className="bottom">
        <Button className="mr-2">Add</Button>
        <Button>Remove</Button>
      </div>
    </div>
  );
}
