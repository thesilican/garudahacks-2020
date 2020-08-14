import { Name } from "./types";
import { WeightedCoordinate, Coordinate } from "@thesilican/react-google-maps";

const Util = {
  joinName(name: Name) {
    return name.first + " " + name.last;
  },
  getInfectionChance(location: Coordinate, infections: WeightedCoordinate[]) {
    return 1;
  },
};

export default Util;
