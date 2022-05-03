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

  const statusOptions = ["Incomplete", "Pending", "Verified"];
  const actionOptions = [
    "Add Validation",
    "Edit Validation",
    "Edit Validation",
  ];

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
              {statusOptions[validationStatus.Donor]}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions disableSpacing className="flex">
          <Button variant="contained" id="Donor" onClick={handleClick}>
            {actionOptions[validationStatus.Donor]}
          </Button>
          <IconButton className="ml-auto">
            {validationStatus.Donor != 0 ? (
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
              {statusOptions[validationStatus.Requester]}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions disableSpacing className="flex">
          <Button variant="contained" id="Requester" onClick={handleClick}>
            {actionOptions[validationStatus.Requester]}
          </Button>
          <IconButton className="ml-auto">
            {validationStatus.Requester != 0 ? (
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
              {statusOptions[validationStatus.Vendor]}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions disableSpacing className="flex">
          <Button variant="contained" id="Vendor" onClick={handleClick}>
            {actionOptions[validationStatus.Vendor]}
          </Button>
          <IconButton className="ml-auto">
            {validationStatus.Vendor != 0 ? (
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
