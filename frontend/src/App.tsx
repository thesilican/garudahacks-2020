import { Google } from "@thesilican/react-google-maps";
import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AboutView from "./components/about/AboutView";
import DashboardView from "./components/dashboard/DashboardView";
import HeatMapView from "./components/heatmap/HeatMapView";
import HomeView from "./components/home/HomeView";
import LoginView from "./components/signup/LoginView";
import SignUpView from "./components/signup/SignUpView";
import TopNavBar from "./components/TopNavBar";
import { LoginState } from "./types";

function loginStore(): LoginState | null {
  const res = window.localStorage.getItem("login");
  if (res === null) return null;
  return JSON.parse(res);
}

export default function App() {
  const [login, setLogin] = useState(loginStore);
  function handleLogin(state: LoginState) {
    setLogin(state);
    window.localStorage.setItem("login", JSON.stringify(state));
  }
  function handleLogout() {
    setLogin(null);
    window.localStorage.removeItem("login");
  }

  return (
    <Google>
      <div className="App">
        <BrowserRouter>
          <TopNavBar login={login} onLogout={handleLogout} />
          <Switch>
            <Route exact path="/">
              <HomeView />
            </Route>
            <Route path="/about">
              <AboutView />
            </Route>
            <Route path="/map">
              <HeatMapView />
            </Route>
            <Route path="/dashboard">
              {login ? (
                <DashboardView token={login.token} hospital={login.hospital} />
              ) : (
                <Redirect to="login" />
              )}
            </Route>
            <Route path="/login">
              <LoginView onLogin={handleLogin} />
            </Route>
            <Route path="/signup">
              <SignUpView onLogin={handleLogin} />
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
