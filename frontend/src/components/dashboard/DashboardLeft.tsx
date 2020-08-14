import React from "react";
import { Button } from "react-bootstrap";
import { Person, Name } from "../../types";
import Util from "../../util";

type DashboardLeftProps = {
  patients: Person[];
  selIndex: number;
  onChangeIndex: (index: number) => void;
};

export default function DashboardLeft(props: DashboardLeftProps) {
  return (
    <div className="DashboardLeft">
      <div className="top">
        <h1>Joe's Hospital</h1>
        <p>60 My Hospital Lane, Toronto, Ontario</p>
      </div>
      <div className="patients">
        <div className="wrapper">
          <h2>Patients</h2>
          {props.patients.map((x, i) => (
            <PatientItem
              key={x.id}
              name={x.name}
              onClick={() => props.onChangeIndex(i)}
              selected={i === props.selIndex}
            />
          ))}
        </div>
      </div>
      <div className="bottom">
        <Button className="mr-2">Add Patient</Button>
        <Button variant="danger">Remove Patient</Button>
      </div>
    </div>
  );
}

type PatientItemProps = {
  name: Name;
  selected: boolean;
  onClick: () => void;
};

function PatientItem(props: PatientItemProps) {
  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    props.onClick();
  }
  return (
    <div className="PatientItem">
      <a href={props.selected ? undefined : ""} onClick={handleClick}>
        {Util.joinName(props.name)}
      </a>
    </div>
  );
}
