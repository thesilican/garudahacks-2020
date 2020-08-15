import React from "react";
import { Button } from "react-bootstrap";
import { Hospital, Name, Person } from "../../types";
import Util from "../../util";

type DashboardLeftProps = {
  hospital: Hospital;
  patients: Person[];
  selIndex: number;
  onChangeIndex: (index: number) => void;
  onAddPerson: (name: Name) => void;
  onRemovePerson: () => void;
};

export default function DashboardLeft(props: DashboardLeftProps) {
  function handleAddClick() {
    const text = prompt("What is the name of your patient?")?.split(" ");
    if (!text || text.length < 2) {
      alert("Your name must have a first and last name");
      return;
    }
    const name = {
      first: text[0],
      last: text[1],
    };
    props.onAddPerson(name);
  }
  function handleRemoveClick() {
    const person = props.patients[props.selIndex];
    const res = confirm(
      "Are you sure you want to remove " +
        Util.joinName(person.name) +
        " from your records?"
    );
    if (!res) {
      return;
    }
    props.onRemovePerson();
  }

  return (
    <div className="DashboardLeft">
      <div className="top">
        <h1>{props.hospital.name}</h1>
        <p>{props.hospital.address}</p>
      </div>
      <div className="patients">
        <div className="wrapper">
          <h2>Patients</h2>
          {props.patients.map((x, i) => (
            <PatientItem
              key={x._id}
              name={x.name}
              onClick={() => props.onChangeIndex(i)}
              selected={i === props.selIndex}
            />
          ))}
        </div>
      </div>
      <div className="bottom">
        <Button className="mr-2" onClick={handleAddClick}>
          Add Patient
        </Button>
        <Button variant="danger" onClick={handleRemoveClick}>
          Remove Patient
        </Button>
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
