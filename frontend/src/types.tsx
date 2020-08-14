import { WeightedCoordinate } from "@thesilican/react-google-maps";

export type Name = {
  first: string;
  last: string;
};

export type Person = {
  name: Name;
  id: string;
  locations: WeightedCoordinate[];
};
