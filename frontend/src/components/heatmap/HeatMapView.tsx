import {
  HeatMap,
  Map,
  Marker,
  WeightedCoordinate,
  Coordinate,
  Circle,
} from "@thesilican/react-google-maps";
import React, { useState, useEffect } from "react";
import { API } from "../../api";
import Util from "../../util";
import { Form } from "react-bootstrap";
import { useDebouncedCallback } from "use-debounce/lib";

type HeatMapViewProps = {};

export default function HeatMapView(props: HeatMapViewProps) {
  const [floatMarker, setFloatMarker] = useState(null as Coordinate | null);
  const [data, setData] = useState(null as WeightedCoordinate[] | null);
  const [address, setAddress] = useState(null as string | null);
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [center, setCenter] = useState(null as Coordinate | null);
  const infectionChance =
    floatMarker && data ? Util.getInfectionChance(floatMarker, data) : null;
  useEffect(() => {
    API.heatmap().then((data) => {
      setData(data.locations);
      setCenter(data.locations[0] ?? null);
    });
  }, []);
  function handleFloatChange(location: Coordinate | null) {
    setFloatMarker(location);
    if (location) {
      API.reversegeo({ location }).then((data) => setAddress(data.address));
    }
  }
  async function handleSearchEnter() {
    setSearchLoading(true);
    const location = floatMarker ??
      (data ? data[0] : undefined) ?? { lat: 0, lng: 0 };
    API.discover({ location, search }).then((data) => {
      const place = data.places[0];
      if (place) {
        setFloatMarker(place.position);
        setCenter(place.position);
        setAddress(place.address);
        setSearchLoading(false);
      }
    });
  }

  return (
    <div className="HeatMapView">
      <Map
        center={center ?? undefined}
        zoom={16}
        onClick={(m, e) => {
          e.stop();
          handleFloatChange(e.latLng.toJSON());
        }}
      >
        <HeatMap data={data ?? []} radius={30} maxIntensity={8} />
        {floatMarker && (
          <>
            <Marker
              position={floatMarker}
              draggable
              onDragEnd={(m) =>
                handleFloatChange(m.getPosition()?.toJSON() ?? null)
              }
            />
            <Circle
              fillColor="#FF0000"
              strokeColor="#FF0000"
              radius={10}
              center={floatMarker}
              clickable={false}
            />
            <Circle
              fillColor="#DDDD00"
              strokeColor="#DDDD00"
              radius={50}
              center={floatMarker}
              clickable={false}
            />
            <Circle
              fillColor="#00DD00"
              strokeColor="#00DD00"
              radius={200}
              center={floatMarker}
              clickable={false}
            />
          </>
        )}
      </Map>
      <div className="controls">
        <div
          className={
            "stats mr-3 " +
            (infectionChance ? infectionChance[1].replace(" ", "") : "")
          }
        >
          {floatMarker && infectionChance ? (
            <span>
              {address && (
                <>
                  <span>{address}</span>
                  <hr />
                </>
              )}
              <span className="head">Rating:</span>
              <br />
              <span className={"lg"}>{infectionChance[1]}</span>
              <br />
              <span>{infectionChance[0].toFixed(1)} infection points</span>
              <br />
              <a target="_blank" href="/about#infection-points">
                What are infection points?
              </a>
            </span>
          ) : (
            <span>Click on the map to see where the COVID hot spots are</span>
          )}
        </div>
        <Form
          inline
          className="search"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchEnter();
          }}
        >
          {searchLoading && <span>Locating...</span>}
          <Form.Control
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Search for a location"}
          />
        </Form>
      </div>
    </div>
  );
}
