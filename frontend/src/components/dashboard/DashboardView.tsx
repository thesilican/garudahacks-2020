import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import DashboardLeft from "./DashboardLeft";
import DashboardRight from "./DashboardRight";
import { Person } from "../../types";

type DashboardViewProps = {};

const patients: Person[] = [
  {
    id: "0",
    name: {
      first: "Bob",
      last: "Marley",
    },
    locations: [],
  },
  {
    id: "1",
    name: {
      first: "Joe",
      last: "Marley",
    },
    locations: [],
  },
  {
    id: "3",
    name: {
      first: "Jane",
      last: "Marley",
    },
    locations: [],
  },
  {
    id: "4",
    name: {
      first: "Bob",
      last: "Marley",
    },
    locations: [],
  },
  {
    id: "5",
    name: {
      first: "Joe",
      last: "Marley",
    },
    locations: [],
  },
  {
    id: "6",
    name: {
      first: "Jane",
      last: "Marley",
    },
    locations: [],
  },
  {
    id: "7",
    name: {
      first: "Bob",
      last: "Marley",
    },
    locations: [],
  },
  {
    id: "8",
    name: {
      first: "Joe",
      last: "Marley",
    },
    locations: [],
  },
  {
    id: "9",
    name: {
      first: "Jane",
      last: "Marley",
    },
    locations: [],
  },
];

export default function DashboardView(props: DashboardViewProps) {
  const [selIndex, setSelIndex] = useState(0);

  function handleChangeIndex(index: number) {
    setSelIndex(index);
  }

  return (
    <Container className="DashboardView">
      <Row>
        <Col sm={12} md={4}>
          <DashboardLeft
            patients={patients}
            selIndex={selIndex}
            onChangeIndex={handleChangeIndex}
          />
        </Col>
        <Col sm={12} md={8}>
          <DashboardRight />
        </Col>
      </Row>
    </Container>
  );
}
