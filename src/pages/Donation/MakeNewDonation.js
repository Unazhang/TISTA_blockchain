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
  const data = location.state;

  // params to pass to send donation form
  let props = {
    isDonation: true,
    blockchain_address: data.blockchain_address,
    vendor_name: data.vendor_name,
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2} alignItems="flex-end" wrap="nowrap">
          <Grid item xs={15}>
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
          <Grid item xs={10}>
            <Card style={{ backgroundColor: "#e3f2fd" }}>
              <CardHeader title="Donate" />
              <Send {...props} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
