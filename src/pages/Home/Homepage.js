import React from "react";
import { Alert, Stack, Grid, Typography } from "@mui/material";
import ShowCard from "../../components/ShowCard";
import DonationCards from "../../components/DonationCards";

export default function HomePage() {
  return (
    <div>
      {" "}
      <Stack spacing={2}>
        <Alert severity="info">
          Remember to Connect to your MetaMask Wallet!
        </Alert>
        <Alert severity="info">Confirm your profile validation.</Alert>
        <ShowCard />
        <div
          style={{ maxHeight: "200vh", maxWidth: "100vw", overflow: "auto" }}
        >
          <Typography variant="h4" gutterBottom>Trending Projects</Typography>
          <Grid container spacing={2}>
            <DonationCards cardNumber={4} />
          </Grid>
        </div>
      </Stack>
    </div>
  );
}
