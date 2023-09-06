import React, { useState, useEffect } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Loading, MainScreen } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../features/user/userSlice";
import "./loginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginUser } = useSelector((store) => store.user);
  const { isLoading, userInfo, error } = loginUser;

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(userLogin([email, password]));
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {isLoading && <Loading />}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          New Customer?
          <Link to="/register">
            <span>Register Here</span>
          </Link>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginPage;
