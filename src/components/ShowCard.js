import React from "react";
import { Typography, Card, CardContent } from "@mui/material";

function ShowCard() {
  return (
    <Card variant="outlined" style={{ height: "100%" }}>
      <CardContent
        style={{
          height: "80%",
          ordWrap: "break-word",
          display: "block",
          overflow: "hidden",
          whiteSpace: "normal",
        }}
      >
        <Typography
          id="title"
          gutterBottom
          variant="h6"
          style={{ fontSize: "2.5vh" }}
        >
            Why chose this platform:
        </Typography>
        <Typography noWrap variant="body2" color="textSecondary" component="p">
          Some content here.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ShowCard;
