import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../../assets/logo.png";
import img1 from "../../../assets/indonesia_heatmap.png";
import feat1 from "../../../assets/feature1.png";
import feat2 from "../../../assets/feature2.png";
import feat3 from "../../../assets/feature3.png";
import tool1 from "../../../assets/tool1.png";
import tool2 from "../../../assets/tool2.png";
import tool3 from "../../../assets/tool3.png";
import tool4 from "../../../assets/tool4.png";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

type HomeViewProps = {};

export default function HomeView(props: HomeViewProps) {
  const divRef = useRef(null as HTMLDivElement | null);
  useEffect(() => {
    window.scrollTo({
      top: 10,
    });
  }, []);
  return (
    <div className="HomeView" ref={divRef}>
      <div className="section-1">
        <div className="back"></div>
        <img className="animate-down" src={logo}></img>
        <h1 className="display-1 animate-down">Hot Spot</h1>
        <p className="subtitle animate-fade">
          Keeping our community safe and up to date
        </p>
      </div>
      <Container fluid className="section-2">
        <div className="back-top" />
        <div className="back-bot" />
        <div className="skew" />
        <Row>
          <Col md={1}></Col>
          <Col md={10} className="content">
            <p className="font-size-lg">
              <span className="font-weight-bold">Hot Spot</span> provides the
              general public with a way to assess risk in their local
              communities Joe Mama lorem ipsum dolor set amet Joe Mama lorem
              ipsum dolor set amet Joe Mama lorem ipsum dolor set amet Joe Mama
              lorem ipsum dolor set amet Joe Mama lorem ipsum dolor set amet
            </p>
            <img src={img1} />
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
      <div className="section-3">
        <h1 className="display-3">Features</h1>
        <Container>
          <Row>
            <Col className="column" md={4}>
              <img src={feat1} />
              <p>Live updates from Hospitals and medical officials</p>
            </Col>
            <Col className="column" md={4}>
              <img src={feat2} />
              <p>
                Percent risk and exposure for specific locations within every
                municipality.
              </p>
            </Col>
            <Col className="column" md={4}>
              <img src={feat3} />
              <p>
                Encrypted tokens to prevent information breaches and limit
                editing to verified accounts.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="section-4">
        <h1 className="display-3">Made with</h1>
        <div className="madewith">
          <div>
            <img src={tool1} />
          </div>
          <div>
            <img src={tool2} />
          </div>
          <div>
            <img src={tool3} />
          </div>
          <div>
            <img src={tool4} />
          </div>
        </div>
      </div>
    </div>
  );
}
