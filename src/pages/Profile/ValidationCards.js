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
import CancelIcon from '@mui/icons-material/Cancel';
import React from "react";

function ValidationCards({ setdisplayCards }) {
  // const styles = useStyles();

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
              Incomplete
            </Typography>
          </Stack>
        </CardContent>
        <CardActions disableSpacing className="flex">
          <Button variant="contained" onClick={setdisplayCards}>
            Add Validation
          </Button>
          <IconButton color="success" className="ml-auto">
            <CheckCircleIcon></CheckCircleIcon>
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
              Complete
            </Typography>
          </Stack>
        </CardContent>
        <CardActions disableSpacing className="flex">
          <Button variant="contained" onClick={setdisplayCards}>
            Edit Validation
          </Button>
          <IconButton color="error" className="ml-auto">
            <CancelIcon></CancelIcon>
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
              Incomplete
            </Typography>
          </Stack>
        </CardContent>
        <CardActions disableSpacing className="flex">
          <Button variant="contained" onClick={setdisplayCards}>
            Add Validation
          </Button>
          <IconButton color="success" className="ml-auto">
            <CheckCircleIcon></CheckCircleIcon>
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
