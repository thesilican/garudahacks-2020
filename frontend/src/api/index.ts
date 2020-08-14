import { Coordinate } from "@thesilican/react-google-maps";
import { Hospital } from "../types";

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

export type LocationParams = {
  address: string;
};
export type LocationResponse = {
  location: Coordinate[];
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
  async location(params: LocationParams) {
    const address = encodeURIComponent(params.address);
    const url = new URL("/api/location");
    url.searchParams.append("address", address);
    const res = await window.fetch(url.toString());
    const data = await res.json();
    return data! as LocationResponse;
  },
};
