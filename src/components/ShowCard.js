import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Paper,
  CardMedia,
} from "@mui/material";
import HomeTop from "../images/HomeTop.png";

const styles = {
  media: {
    height: "80%",
    width: "100%",
    top: "20px",
    left: "20px",
    right: "20px",
    paddingTop: "56.25%", // 16:9
  },
  card: {
    position: "relative",
    fontFamily: "Raleway",
  },
  overlay: {
    position: "absolute",
    top: "30%",
    left: "10%",
    color: "white",
    // backgroundColor: "white",
  },
  overlayText: {
    position: "absolute",
    top: "55%",
    left: "10%",
    color: "white",
    // backgroundColor: "white",
  },
  img: {
    height: "20%",
    width: "100%",
  },
};

function ShowCard() {
  return (
    <div>
      <Card style={styles.card}>
        <div style={{ maxHeight: "100vh" }}>
          <CardMedia mediaStyle={styles.media}>
            <img src={HomeTop} style={styles.img} />
          </CardMedia>
          <div style={styles.overlay}>
            <Typography
              fontSize={"300%"}
              fontFamily={"sans-serif"}
              fontWeight={"600"}
            >
              Join us in giving back
            </Typography>
          </div>
          <div style={styles.overlayText}>
            <Typography
              fontSize={"100%"}
              fontFamily={"sans-serif"}
              fontWeight={"400"}
            >
              Causes You Support
              <br />
              Secure Donations
              <br />
              Crypto Compatability
              <br />
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ShowCard;
