import React, { useState, useEffect } from "react";
import {
  Map,
  Coordinate,
  Marker,
  WeightedCoordinate,
} from "@thesilican/react-google-maps";
import { Button, Form } from "react-bootstrap";
import { API } from "../../api";

type DashboardRightProps = {
  address: string;
  coordinates: WeightedCoordinate[];
  onRemoveMarker: (index: number) => void;
  onAddMarker: (coord: WeightedCoordinate) => void;
};

export default function DashboardRight(props: DashboardRightProps) {
  const [floatMarker, setFloatMarker] = useState(null as Coordinate | null);
  const [remove, setRemove] = useState(false);
  const [search, setSearch] = useState("");
  const [mapCenter, setMapCenter] = useState(null as Coordinate | null);
  useEffect(() => {
    if (props.coordinates.length > 0 && !mapCenter) {
      setMapCenter(props.coordinates[0]);
    }
    console.log(props.coordinates);
  }, [props.coordinates]);
  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSearch("");
    API.location({ address: search }).then((data) => {
      setFloatMarker(data.location);
      setMapCenter(data.location);
    });
  }
  function handleMapClick(coord: Coordinate) {
    if (remove) {
      setRemove(false);
    } else {
      setFloatMarker(coord);
    }
  }
  function handleFloatDrag(coord: Coordinate | null) {
    if (remove) {
      setRemove(false);
    }
    setFloatMarker(coord);
  }
  function handleMarkerClick(index: number) {
    if (!remove) return;
    props.onRemoveMarker(index);
  }
  function handleAddButtonClick() {
    if (!floatMarker) {
      alert(
        "Click on the map to add a location, or search for a location in the chat box"
      );
      return;
    }
    const res = prompt("How many hours has this person been at this location?");
    const num = parseFloat(res ?? "NaN");
    if (isNaN(num)) {
      alert("Invalid number of hours");
    } else {
      setFloatMarker(null);
      props.onAddMarker({ ...floatMarker, weight: num });
    }
  }
  function handleRemoveButtonClick() {
    setRemove(!remove);
  }

  return (
    <div className="DashboardRight">
      <Form inline className="top" onSubmit={handleSearchSubmit}>
        <Form.Control
          className="mr-2"
          placeholder="Search for location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></Form.Control>
        <Button type="submit">Search</Button>
      </Form>
      <div className="wrapper">
        <Map
          zoom={14}
          center={mapCenter ?? undefined}
          onClick={(m, e) => handleMapClick(e.latLng.toJSON())}
        >
          {floatMarker && (
            <Marker
              label="?"
              draggable
              onDragEnd={(e) =>
                handleFloatDrag(e.getPosition()?.toJSON() ?? null)
              }
              position={floatMarker}
            ></Marker>
          )}
          {props.coordinates.map((x, i) => (
            <Marker
              key={i}
              position={x}
              label={x.weight + ""}
              onClick={() => handleMarkerClick(i)}
            />
          ))}
        </Map>
      </div>
      <div className="bottom">
        <Button className="mr-2" onClick={handleAddButtonClick}>
          {floatMarker ? "Set hours & confirm" : "Add new location"}
        </Button>
        <Button onClick={handleRemoveButtonClick} variant="danger">
          {remove ? "Click on a marker to remove it" : "Remove"}
        </Button>
      </div>
    </div>
  );
}
