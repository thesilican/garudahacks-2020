import { WeightedCoordinate } from "@thesilican/react-google-maps";

export type Name = {
  first: string;
  last: string;
};

export type Person = {
  name: Name;
  _id: string;
  locations: WeightedCoordinate[];
};

export type Hospital = {
  name: string;
  address: string;
};

export type LoginState = {
  hospital: Hospital;
  email: string;
  token: string;
};
