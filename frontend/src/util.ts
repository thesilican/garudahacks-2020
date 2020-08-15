import { Name } from "./types";
import { WeightedCoordinate, Coordinate } from "@thesilican/react-google-maps";

type InfectionRating = "safe" | "moderate" | "dangerous" | "highly dangerous";

const Util = {
  joinName(name: Name) {
    return name.first + " " + name.last;
  },
  getDistance(loc1: Coordinate, loc2: Coordinate) {
    // https://stackoverflow.com/questions/639695/how-to-convert-latitude-or-longitude-to-meters
    const { lat: lat1, lng: lon1 } = loc1;
    const { lat: lat2, lng: lon2 } = loc2;
    var R = 6378.137; // Radius of earth in KM
    var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
    var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // meters
  },
  getInfectionChance(
    location: Coordinate,
    infections: WeightedCoordinate[]
  ): [number, InfectionRating] {
    let sum = 0;
    for (const inf of infections) {
      const dist = Util.getDistance(inf, location);
      if (dist < 10) {
        sum += Math.sqrt(inf.weight) * 7;
      } else if (dist < 50) {
        sum += Math.sqrt(inf.weight);
      } else if (dist < 200) {
        sum += Math.sqrt(inf.weight) / 10;
      }
    }
    if (sum < 1) {
      return [sum, "safe"];
    } else if (sum < 3) {
      return [sum, "moderate"];
    } else if (sum < 7) {
      return [sum, "dangerous"];
    } else {
      return [sum, "highly dangerous"];
    }
  },
  isIconMouseEvent(
    e: google.maps.MouseEvent | google.maps.IconMouseEvent
  ): e is google.maps.IconMouseEvent {
    return "placeId" in e;
  },
};

export default Util;
