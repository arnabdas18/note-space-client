import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "center",
        bottom: 0,
        position: "relative",
        width: "100%",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Note Space</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
