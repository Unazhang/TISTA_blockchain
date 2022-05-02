import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Box, Button, Grid, CardMedia } from "@mui/material";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to login");
    }

    setLoading(false);
  }

  return (
    <div>
      <Box sx={{ ml: 40, mr: 40, mt: 15 }}>
        <Grid>
          <Grid container wrap="nowrap">
            <Grid item xs={8}>
              <CardMedia
                mediaStyle={{
                  height: "50px",
                  width: "100%",
                  // top: "20px",
                  // left: "20px",
                  // right: "20px",
                  // paddingTop: "56.25%",
                }}
              >
                <img
                  src="https://www.diariodemarratxi.com/wp-content/uploads/2018/10/sangre-corazon-manos.jpg"
                  style={{ height: "330px", width: "100%" }}
                />
              </CardMedia>
            </Grid>
            <Grid item xs={8}>
              {" "}
              <Card>
                <Card.Body>
                  <h2 className="text-center mb-4">Sign in to TISTA</h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        ref={passwordRef}
                        required
                      />
                    </Form.Group>
                    <Button
                      disabled={loading}
                      className="w-100"
                      type="submit"
                      variant="contained"
                    >
                      Log In
                    </Button>
                  </Form>
                  <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign Up</Link>
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
