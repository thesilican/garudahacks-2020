import {
  Coordinate,
  DefaultCoordinate,
  Map,
  Marker,
  WeightedCoordinate,
} from "@thesilican/react-google-maps";
import React, { useEffect, useState } from "react";
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
    if (!mapCenter && props.coordinates.length > 0) {
      setMapCenter(props.coordinates[0]);
    }
    console.log(props.coordinates);
  }, [props.coordinates]);
  console.log(mapCenter);
  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSearch("");
    const location = props.coordinates[0] ?? mapCenter ?? DefaultCoordinate;
    API.discover({ location, search }).then((data) => {
      const place = data.places[0];
      if (place) {
        console.log(place.position);
        setFloatMarker(place.position);
        setMapCenter(place.position);
      }
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
        "Click on the map to add a location, or search for a location using the search bar"
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
  function handleInfoClick() {
    alert(
      "This is the main dashboard where you (the hospital) can add patient data.\n" +
        "Add or remove patients from your patient list using the buttons on the bottom left\n" +
        "You can add locations that a COVID-infected patient has visited recently to the map. Click on the map or " +
        "search for a specific location using the search bar. Once the marker is added, " +
        "click 'Set hours & confirm' to add the location to the map.\n" +
        "You can remove markers that were added by mistake by clicking 'Remove' and then clicking on the markers"
    );
  }

  return (
    <div className="DashboardRight">
      <Form inline className="top" onSubmit={handleSearchSubmit}>
        <Form.Control
          className="mr-2"
          placeholder="Search for a nearby location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></Form.Control>
        <Button type="submit">Search</Button>
      </Form>
      <div className="wrapper">
        <Map
          zoom={14}
          center={mapCenter ?? undefined}
          onClick={(m, e) => {
            e.stop();
            handleMapClick(e.latLng.toJSON());
          }}
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
        <Button className="mr-2" onClick={handleRemoveButtonClick} variant="danger">
          {remove ? "Click on a marker to remove it" : "Remove"}
        </Button>
        <a href="" onClick={handleInfoClick}>
          Help
        </a>
      </div>
    </div>
  );
}
