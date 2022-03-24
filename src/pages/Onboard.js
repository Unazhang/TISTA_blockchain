import React, { useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import { Link, useHistory } from "react-router-dom";
import cryptoImage from "../images/crypto.png";
import { Container, Row, Col } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div>
      <div>
        <Row>
          <Col>
            <Link to="/login">Login</Link>
          </Col>
          <Col>
            <Link to="/signup">Sign Up</Link>
          </Col>
        </Row>
      </div>
      <div>
        <span>
          <img
            src={cryptoImage}
            class="center-block"
            style={{ width: "700px", height: "700px", objectFit: "cover" }}
            align="left"
          />
        </span>
        <span>
          <h3>Welcome, join us right now!</h3>
        </span>
      </div>
    </div>
  );
}
