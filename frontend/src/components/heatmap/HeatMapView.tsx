import {
  HeatMap,
  Map,
  Marker,
  WeightedCoordinate,
  Coordinate,
} from "@thesilican/react-google-maps";
import React, { useState, useEffect } from "react";
import { API } from "../../api";
import Util from "../../util";

type HeatMapViewProps = {};

export default function HeatMapView(props: HeatMapViewProps) {
  const [floatMarker, setFloatMarker] = useState(null as Coordinate | null);
  const [data, setData] = useState(null as WeightedCoordinate[] | null);
  const center = data ? data[0] : undefined;
  const infectionChance =
    floatMarker && data ? Util.getInfectionChance(floatMarker, data) : null;
  useEffect(() => {
    API.heatmap().then((data) => {
      setData(data.locations);
    });
  }, []);
  function handleMapClick(coord: Coordinate) {
    setFloatMarker(coord);
  }
  function handleFloatDrag(coord: Coordinate | null) {
    setFloatMarker(coord);
  }

  return (
    <div className="HeatMapView">
      <Map
        center={center}
        zoom={14}
        onClick={(m, e) => handleMapClick(e.latLng.toJSON())}
      >
        <HeatMap data={data ?? []} radius={15} />
        {floatMarker && (
          <Marker
            position={floatMarker}
            draggable
            onDragEnd={(m) =>
              handleFloatDrag(m.getPosition()?.toJSON() ?? null)
            }
          />
        )}
      </Map>
      <div className="controls">
        {floatMarker ? (
          <span>
            Infection Chance:
            <br />
            <span className={"lg"}>
              {((infectionChance ?? -1) * 100).toFixed(0)}%
            </span>
          </span>
        ) : (
          <span>Click on the map to see how dangerous different spots are</span>
        )}
      </div>
    </div>
  );
}
