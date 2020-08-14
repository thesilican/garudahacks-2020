import { Name } from "./types";
import { WeightedCoordinate, Coordinate } from "@thesilican/react-google-maps";

type InfectionRating = "safe" | "moderate" | "dangerous" | "highly dangerous";

const Util = {
  joinName(name: Name) {
    return name.first + " " + name.last;
  },
  getInfectionChance(
    location: Coordinate,
    infections: WeightedCoordinate[]
  ): [number, InfectionRating] {
    let sum = 0;
    for (const inf of infections) {
      const dist = Math.hypot(inf.lat - location.lat, inf.lng - location.lng);
      if (dist < 0.0002) {
        sum += Math.sqrt(inf.weight) * 2;
      } else if (dist < 0.002) {
        sum += Math.sqrt(inf.weight) / 5;
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
};

export default Util;
