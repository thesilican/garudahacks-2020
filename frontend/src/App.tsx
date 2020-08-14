import React from "react";
import { Map, Google } from "@thesilican/react-google-maps";
import HomeView from "./components/home/HomeView";
import TopNavBar from "./components/TopNavBar";
import HeatMapView from "./components/heatmap/HeatMapView";
import DashboardView from "./components/dashboard/DashboardView";
import LoginView from "./components/signup/LoginView";
import SignUpView from "./components/signup/SignUpView";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

export default function App() {
  return (
    <Google>
      <div className="App">
        <BrowserRouter>
          <TopNavBar />
          <Switch>
            <Route exact path="/">
              <HomeView />
            </Route>
            <Route path="/map">
              <HeatMapView />
            </Route>
            <Route path="/dashboard">
              <DashboardView />
            </Route>
            <Route path="/login">
              <LoginView />
            </Route>
            <Route path="/signup">
              <SignUpView />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Google>
  );
}
