import { Coordinate, WeightedCoordinate } from "@thesilican/react-google-maps";
import { Hospital, Name, Person } from "../types";

export type SignupParams = {
  hospital: Hospital;
  email: string;
  password: string;
};
export type SignupResponse =
  | {
      status: "email-taken";
    }
  | {
      status: "ok";
      token: string;
    };
export type LoginParams = {
  email: string;
  password: string;
};
export type LoginResponse =
  | {
      status: "incorrect-login";
    }
  | {
      status: "ok";
      token: string;
      hospital: Hospital;
    };
export type HeatmapResponse = {
  locations: WeightedCoordinate[];
};
export type LocationParams = {
  address: string;
};
export type LocationResponse = {
  location: Coordinate | null;
};
export type DiscoverParams = {
  location: Coordinate;
  search: string;
};
export type DiscoverResponse = {
  places: {
    address: string;
    position: Coordinate;
  }[];
};
export type ReverseGeoParams = {
  location: Coordinate;
};
export type ReverseGeoResponse = {
  address: string | null;
};

export type InfectionsGetParams = {
  token: string;
};
export type InfectionsPostParams = {
  token: string;
  name: Name;
  locations: WeightedCoordinate[];
};
export type InfectionsPatchParams = {
  token: string;
  _id: string;
  locations: WeightedCoordinate[];
};
export type InfectionsDeleteParams = {
  token: string;
  _id: string;
};
export type InfectionsResponse =
  | {
      status: "invalid-id" | "invalid-token";
    }
  | {
      status: "ok";
      people: Person[];
    };

export const API = {
  async signup(params: SignupParams): Promise<SignupResponse> {
    const res = await window.fetch("/api/account/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    return data! as SignupResponse;
  },
  async login(params: LoginParams): Promise<LoginResponse> {
    const res = await window.fetch("/api/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    return data! as LoginResponse;
  },
  async heatmap(): Promise<HeatmapResponse> {
    const res = await window.fetch("/api/heatmap");
    const data = await res.json();
    return data! as HeatmapResponse;
  },
  async infectionsGet(
    params: InfectionsGetParams
  ): Promise<InfectionsResponse> {
    const token = encodeURIComponent(params.token);
    const url = "/api/infections?token=" + token;
    const res = await window.fetch(url);
    const data = await res.json();
    return data! as InfectionsResponse;
  },
  async infectionsPost(
    params: InfectionsPostParams
  ): Promise<InfectionsResponse> {
    const res = await window.fetch("/api/infections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    return data! as InfectionsResponse;
  },
  async infectionsPatch(
    params: InfectionsPatchParams
  ): Promise<InfectionsResponse> {
    const res = await window.fetch("/api/infections", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    return data! as InfectionsResponse;
  },
  async infectionsDelete(
    params: InfectionsDeleteParams
  ): Promise<InfectionsResponse> {
    const res = await window.fetch("/api/infections", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    return data! as InfectionsResponse;
  },
  async location(params: LocationParams) {
    const address = encodeURIComponent(params.address);
    const url = "/api/location?address=" + address;
    const res = await window.fetch(url);
    const data = await res.json();
    return data! as LocationResponse;
  },
  async discover(params: DiscoverParams) {
    const search = encodeURIComponent(params.search);
    const { lat, lng } = params.location;
    const url = `/api/discover?search=${search}&lat=${lat}&lng=${lng}`;
    const res = await window.fetch(url);
    const data = await res.json();
    return data! as DiscoverResponse;
  },
  async reversegeo(params: ReverseGeoParams) {
    const { lat, lng } = params.location;
    const url = `/api/reversegeo?lat=${lat}&lng=${lng}`;
    const res = await window.fetch(url);
    const data = await res.json();
    return data! as ReverseGeoResponse;
  },
};
