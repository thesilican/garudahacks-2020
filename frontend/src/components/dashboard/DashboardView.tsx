import { WeightedCoordinate } from "@thesilican/react-google-maps";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { API } from "../../api";
import { Hospital, Name, Person } from "../../types";
import DashboardLeft from "./DashboardLeft";
import DashboardRight from "./DashboardRight";

type DashboardViewProps = {
  hospital: Hospital;
  token: string;
};

export default function DashboardView(props: DashboardViewProps) {
  const [selIndex, setSelIndex] = useState(0);
  const [people, setPeople] = useState(null as Person[] | null);
  const person = people ? people[selIndex] : undefined;
  const coords = person?.locations;
  useEffect(() => {
    API.infectionsGet({ token: props.token }).then((data) => {
      if (data.status === "invalid-token" || data.status === "invalid-id") {
        alert("There was a problem fetching the data");
      } else if (data.status === "ok") {
        setPeople(data.people);
      }
    });
  }, []);
  function handleChangeIndex(index: number) {
    setSelIndex(index);
  }
  function handleUpdateCoordinate(locations: WeightedCoordinate[]) {
    if (!person) return;
    API.infectionsPatch({
      _id: person._id,
      locations,
      token: props.token,
    }).then((data) => {
      if (data.status === "invalid-token" || data.status === "invalid-id") {
        alert("There was a problem updating the data");
      } else if (data.status === "ok") {
        setPeople(data.people);
      }
    });
  }
  function handleAddCoordinate(coord: WeightedCoordinate) {
    handleUpdateCoordinate(coords ? [...coords, coord] : [coord]);
  }
  function handleRemoveCoordinate(index: number) {
    handleUpdateCoordinate(coords ? coords.filter((_, i) => i !== index) : []);
  }
  function handleAddUser(name: Name) {
    API.infectionsPost({
      name,
      token: props.token,
      locations: [],
    }).then((data) => {
      if (data.status === "invalid-token" || data.status === "invalid-id") {
        alert("There was a problem updating the data");
      } else if (data.status === "ok") {
        setPeople(data.people);
      }
    });
  }
  function handleRemoveUser() {
    if (!person) return;
    API.infectionsDelete({
      _id: person._id,
      token: props.token,
    }).then((data) => {
      if (data.status === "invalid-token" || data.status === "invalid-id") {
        alert("There was a problem updating the data");
      } else if (data.status === "ok") {
        setPeople(data.people);
      }
    });
  }

  return (
    <div className="DashboardView">
      <Container>
        <Row>
          <Col sm={12} md={4}>
            <DashboardLeft
              hospital={props.hospital}
              patients={people ?? []}
              selIndex={selIndex}
              onChangeIndex={handleChangeIndex}
              onAddPerson={handleAddUser}
              onRemovePerson={handleRemoveUser}
            />
          </Col>
          <Col sm={12} md={8}>
            <DashboardRight
              address={props.hospital.address}
              coordinates={coords ?? []}
              onAddMarker={handleAddCoordinate}
              onRemoveMarker={handleRemoveCoordinate}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
