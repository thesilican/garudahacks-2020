import { HeatMap, Map, Marker } from "@thesilican/react-google-maps";
import React from "react";

type HeatMapViewProps = {};

const data = [
  { lat: 37.782, lng: -122.447 },
  { lat: 37.782, lng: -122.445 },
  { lat: 37.782, lng: -122.443 },
  { lat: 37.782, lng: -122.441 },
  { lat: 37.782, lng: -122.439 },
  { lat: 37.782, lng: -122.437 },
  { lat: 37.782, lng: -122.435 },
  { lat: 37.785, lng: -122.447 },
  { lat: 37.785, lng: -122.445 },
  { lat: 37.785, lng: -122.443 },
  { lat: 37.785, lng: -122.441 },
  { lat: 37.785, lng: -122.439 },
  { lat: 37.785, lng: -122.437 },
  { lat: 37.785, lng: -122.435 },
];

export default function HeatMapView(props: HeatMapViewProps) {
  return (
    <div className="HeatMapView">
      <Map zoom={14}>
        <HeatMap data={data} />
        <Marker position={{ lat: 37.785, lng: -122.439 }} />
      </Map>
      <div className="controls">
        <span>
          Infection Chance:
          <br />
          <span className={"lg"}>100%</span>
        </span>
      </div>
    </div>
  );
}
