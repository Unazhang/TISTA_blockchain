import React, { useRef, useState } from "react";
import { Form, Card, Alert, ButtonGroup } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Box, Button, Grid, CardMedia } from "@mui/material";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div>
      <Box sx={{ ml: 25, mr: 25, mt: 15 }}>
        <Grid>
          <Grid container wrap="nowrap">
            <Grid item xs={8}>
              <CardMedia
                mediaStyle={{
                  height: "80px",
                  width: "100%",
                  // top: "20px",
                  // left: "20px",
                  // right: "20px",
                  // paddingTop: "56.25%",
                }}
              >
                <img
                  src="https://blog.delusionmfg.com/wp-content/uploads/2020/03/shape-your-beret-the-right-way.jpg"
                  style={{ height: "600px", width: "100%" }}
                />
              </CardMedia>
            </Grid>
            <Grid item xs={8}>
              <Card style={{ height: "100%", width: "100%" }}>
                <Card.Body>
                  <h2 className="text-center mb-4">Sign up to TISTA</h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group id="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        ref={nameRef}
                        required
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        ref={emailRef}
                        required
                      ></Form.Control>
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
                    <Button
                      disabled={loading}
                      className="w-100"
                      type="submit"
                      variant="contained"
                    >
                      Sign Up
                    </Button>
                  </Form>
                  <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Log In</Link>
                  </div>
                </Card.Body>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
