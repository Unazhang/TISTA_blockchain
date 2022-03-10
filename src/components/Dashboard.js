import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import cryptoImage from "../images/crypto.png";

export default function Dashboard() {
  return (
    <div>
      <Container fluid>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Welcome, join us right now!</Card.Title>
              <Card.Text>
                <div className="w-100 text-center mt-2">
                  <Link to="/login">Login</Link>
                </div>
                <div className="w-100 text-center mt-2">
                  <Link to="/signup">Sign Up</Link>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Img src={cryptoImage} variant="right" />
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </div>
  );
}
