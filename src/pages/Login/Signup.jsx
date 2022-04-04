import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, ButtonGroup } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [role, setRole] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    // confirm passwords match
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      console.log("inside do not match");
      return setError("Password does not match. ");
    }

    try {
      setError("");
      setLoading(true);
      console.log(role);
      await signup(emailRef.current.value, passwordRef.current.value, role);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  //TODO add requirement for role selection
  const handleClick = (e) => {
    console.log(e.target.id);
    setRole(e.target.id);
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>
                Password (must be at least 6 characters long)
              </Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
              ></Form.Control>
            </Form.Group>
            <ButtonGroup id="rolebuttons" className="form-group d-flex justify-content-between">
              <Button className="mr-1" type="button" id="Donor" onClick={handleClick}>Donor</Button>
              <Button className="mx-2" type="button" id="Requester" onClick={handleClick}>Requester</Button>
              <Button className="ml-1" type="button" id="Vendor" onClick={handleClick}>Vendor</Button>
            </ButtonGroup>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}
