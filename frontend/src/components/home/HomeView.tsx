import React from "react";
import { Container, Row, Col } from "react-bootstrap";

type HomeViewProps = {};

export default function HomeView(props: HomeViewProps) {
  return (
    <Container className="HomeView">
      <Row>
        <Col>
          <h1>APPNAME</h1>
          <p>A really cool app that you want to use</p>
          <img src="http://www.picsmine.com/wp-content/uploads/2017/03/Cool-Meme-Ok-cool.jpg"></img>
        </Col>
      </Row>
    </Container>
  );
}
