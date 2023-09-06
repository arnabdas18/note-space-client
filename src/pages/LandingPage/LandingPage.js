import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Note Zipper</h1>
              <p className="subtitle">One Safe place for all your notes.</p>
            </div>
            <div className="buttonContainer">
              <Button className="landingButton" size="lg">
                <Link to="/login">Login</Link>
              </Button>

              <Button
                className="landingButton"
                size="lg"
                variant="outline-primary"
              >
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
