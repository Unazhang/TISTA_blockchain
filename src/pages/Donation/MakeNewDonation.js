import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";
import { Card, Button, Grid } from "@material-ui/core";
import { CardHeader } from "@mui/material";
import { Typography } from "@material-ui/core";
import Send from "./send.js";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default function MakeNewDonation() {
  // post axios
  const API_BASE_URL = `http://localhost:4000`;

  // const address = props;
  const location = useLocation();
  console.log("obj", location.state);
  const data = location.state;
  console.log("data", data, data.req_title);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2} alignItems="flex-end" wrap="nowrap">
          <Grid item xs={20}>
            <Card>
              <CardHeader title={data.req_title} />
              <Typography>
                {data.requester_name} | Verified Requester
              </Typography>
              <Typography variant="h6">About</Typography>
              <Typography>{data.description}</Typography>
              <Typography variant="h6">Third Party Vendor</Typography>
              <Typography>
                Blockchain Address: {data.blockchain_address}
              </Typography>
              <Typography variant="h6">Progress</Typography>
              <Typography>Goal: {data.target_amount}</Typography>
              <Typography>Amount Raised: {data.current_amount}</Typography>
              <Typography variant="h6">Donation History</Typography>
              <Typography>{data.donation_history}</Typography>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card>
              <Send isDonation />
            </Card>
          </Grid>
        </Grid>
      </Box>
      {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>1</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>2</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>3</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>4</Item>
        </Grid>
      </Grid> */}
    </div>
  );
}
