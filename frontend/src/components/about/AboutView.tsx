import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../../assets/logo.png";
import about1 from "../../../assets/about1.png";
import about2 from "../../../assets/about2.png";

type AboutViewProps = {};

export default function AboutView(props: AboutViewProps) {
  return (
    <div className="AboutView">
      <Container className="AboutView">
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <div className="header">
              <img src={logo} className="mr-3" />
              <h1>About Hot Spot</h1>
            </div>
            <div className="section-1 clearfix">
              <p>
                <img className="float-right" src={about1} />
                Hot Spot provides users with a live, up-to-date{" "}
                <a target="_blank" href="/map">
                  heat map
                </a>{" "}
                that shows the infection risk of various locations, based on the
                location history of patients with COVID.
              </p>
              <p>
                After a patient has tested positive for COVID-19, their doctor
                will ask the patient for a list of locations that they visited
                recently. The doctor can then add these locations to the
                interactive heat map, using the online{" "}
                <a target="_blank" href="/dashboard">
                  dashboard
                </a>
                .
              </p>
              <p>
                These locations are then agregated (to protect user privacy) and
                will show up as points on the{" "}
                <a target="_blank" href="/map">
                  heat map
                </a>{" "}
              </p>
            </div>
            <div className="section-2">
              <h2>The Heat Map</h2>
              <p>
                Clicking on the map will show the address of that location, as
                well as provide the user with a rating about how safe that
                locations is.
              </p>
              <p>The ratings are:</p>
              <ul>
                <li>Safe - No significant COVID infections nearby</li>
                <li>
                  Moderate - Some people with COVID have been nearby, be more
                  cautious when visiting this location
                </li>
                <li>
                  Dangerous - Either someone with COVID has directly been to
                  this location, or multiple infected people have been nearby.
                  Avoid going to this location if you can, or proceed with extra
                  precautions
                </li>
                <li>
                  Highly dangerous - Many people infected with COVID has visited
                  this location. Avoid going to this location unless absolutely
                  necessary.
                </li>
              </ul>
              <p>
                The safety of an area is determined by the location's{" "}
                <a href="#infection-points">infection point score</a> It will
                also display a series of three circles on the map, which are
                used in the calculation of a location's infection point score.
              </p>
              <img src={about2} />
              <p>
                Users can also search for locations using the search bar at the
                bottom
              </p>
            </div>{" "}
            <div className="section-3">
              {/*
              // @ts-ignore */}
              <a name="infection-points">
                <h2>Infection Points</h2>
              </a>
              <p>
                A location's{" "}
                <span className="font-weight-bold">infection point score</span>{" "}
                is an approximation of how dangerous a location is, in terms of
                COVID infection. A higher infection point score means that you
                have a higher chance of catching COVID while visiting that
                location.
              </p>
              <p>
                The{" "}
                <span className="font-weight-bold">infection point score</span>{" "}
                is calculated based on the number of infected locations within
                one of the three radiuses - red radius, yellow radius, and green
                radius. You can see these radiuses on the map.
              </p>
              <p>
                <span className="font-weight-bold">The red radius</span> is 10
                meters wide, and accounts for infected visits that occured at
                that location. Any infected visits within these radiuses will
                greatly increase the infection point score, marking that
                location as 'dangerous', at the minimum.
              </p>
              <p>
                <span className="font-weight-bold">The yellow radius</span> is
                50 meters wide, and accounts for infected visits that occured
                nearby to that location. Infected visits within this radius will
                increase the infection point a moderate amount. If 2 infected
                visits occur in the yellow radius, the location will be marked
                as 'moderate' at minimum.
              </p>
              <p>
                <span className="font-weight-bold">The green radius</span> is
                200 meters wide, and accounts for infected visits within the
                general area. Infected visits within this radius only slightly
                increase the infection point score, but if too many people
                tested positive within that area, the score of that location
                will go up, indicating that there is a much greater chance of
                someone being infected in that area.
              </p>
            </div>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container>
    </div>
  );
}
