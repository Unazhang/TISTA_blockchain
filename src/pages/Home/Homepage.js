import React from "react";
import { Alert, Stack, Grid, Typography, Box } from "@mui/material";
import ShowCard from "../../components/ShowCard";
import DonationCards from "../../components/DonationCards";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
// test

export default function HomePage() {
  const [open, setOpen] = React.useState(true);
  return (
    <div>
      {" "}
      <br />
      <br />
      <br />
      <Stack>
        <Box sx={{ width: "100%" }}>
          <Collapse in={open}>
            <Alert
              severity="info"
              styles={{ backgroundColor: "#D3DBEA", color: "#194DB0" }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Notification: Connect your MetaMask wallet.
            </Alert>
          </Collapse>
        </Box>
        <ShowCard />
        <div
          style={{
            maxHeight: "200vh",
            maxWidth: "100vw",
            overflow: "auto",
            left: "50px",
            right: "50px",
          }}
        >
          <Box sx={{ ml: 20, mr: 20, mt: 5 }}>
            <Typography
              fontSize={"150%"}
              fontFamily={"sans-serif"}
              fontWeight={"600"}
              gutterBottom
            >
              Explore Projects
            </Typography>
            <Typography
              fontSize={"100%"}
              fontFamily={"sans-serif"}
              fontWeight={"500"}
            >
              You have brains in your head. You have feet in your shoes. You can
              steer yourself any direction you choose. You're on your own. And
              you know what you know. And YOU are the one who'll decide where to
              go.
            </Typography>
            <br />
          </Box>
          <Box sx={{ ml: 20, mr: 20 }}>
            <Grid container direction={"row"} spacing={3}>
              <DonationCards cardNumber={4} />
            </Grid>
          </Box>
        </div>
      </Stack>
    </div>
  );
}
