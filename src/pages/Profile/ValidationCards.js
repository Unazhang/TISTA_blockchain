// import { Card, Typography, CardHeader, CardActions } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import {
  Stack,
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import React, { useState } from "react";

function ValidationCards({
  setdisplayCards,
  setCurrentCard,
  validationStatus,
}) {
  // const styles = useStyles();

  const handleClick = (e) => {
    setdisplayCards();
    setCurrentCard(e.target.id);
  };

  return (
    <Stack spacing={2}>
      <Card
        variant="outlined"
        className="p-2"
        sx={{ maxWidth: 400 }}
        style={{ backgroundColor: "#F2F4F8" }}
      >
        <CardContent>
          <Stack direction={"row"}>
            <Typography variant="body1">Donor Validation</Typography>
            <Typography variant="body1" className="ml-auto">
              {validationStatus.Donor ? "Complete" : "Incomplete"}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions disableSpacing className="flex">
          <Button variant="contained" id="Donor" onClick={handleClick}>
            {validationStatus.Donor ? "Edit Validation" : "Add Validation"}
          </Button>
          <IconButton className="ml-auto">
            {validationStatus.Donor ? (
              <CheckCircleIcon color="success" />
            ) : (
              <CancelIcon color="error" />
            )}
          </IconButton>
        </CardActions>
      </Card>
      <Card
        variant="outlined"
        className="p-2"
        sx={{ maxWidth: 400 }}
        style={{ backgroundColor: "#F2F4F8" }}
      >
        <CardContent>
          <Stack direction={"row"}>
            <Typography variant="body1">Requester Validation</Typography>
            <Typography variant="body1" className="ml-auto">
              {validationStatus.Requester ? "Complete" : "Incomplete"}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions disableSpacing className="flex">
          <Button variant="contained" id="Requester" onClick={handleClick}>
            {validationStatus.Requester ? "Edit Validation" : "Add Validation"}
          </Button>
          <IconButton className="ml-auto">
            {validationStatus.Requester ? (
              <CheckCircleIcon color="success" />
            ) : (
              <CancelIcon color="error" />
            )}
          </IconButton>
        </CardActions>
      </Card>
      <Card
        variant="outlined"
        className="p-2"
        sx={{ maxWidth: 400 }}
        style={{ backgroundColor: "#F2F4F8" }}
      >
        <CardContent>
          <Stack direction={"row"}>
            <Typography variant="body1">Vendor Validation</Typography>
            <Typography variant="body1" className="ml-auto">
              {validationStatus.Vendor ? "Complete" : "Incomplete"}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions disableSpacing className="flex">
          <Button variant="contained" id="Vendor" onClick={handleClick}>
            {validationStatus.Vendor ? "Edit Validation" : "Add Validation"}
          </Button>
          <IconButton className="ml-auto">
            {validationStatus.Vendor ? (
              <CheckCircleIcon color="success" />
            ) : (
              <CancelIcon color="error" />
            )}
          </IconButton>
        </CardActions>
      </Card>
    </Stack>
  );
}

// const useStyles = makeStyles((theme) => ({
//     root: {
//       //styleName: Mini head;
//         font-family: "Ubuntu",
//         font-size: "20px",
//         font-weight: 700,
//         line-height: "26px",
//         letter-spacing: "0.01em",
//         text-align: "left",
//     },
//   }));

export default ValidationCards;
