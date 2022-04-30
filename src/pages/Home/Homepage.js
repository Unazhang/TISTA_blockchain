import React from "react";
import { Alert, Stack, Grid, Typography, Box, Button } from "@mui/material";
import ShowCard from "../../components/ShowCard";
import DonationCards from "../../components/DonationCards";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";

export default function HomePage() {
  const [open, setOpen] = React.useState(true);
  return (
    <div>
      {" "}
      <Stack>
        <Box sx={{ width: "100%" }}>
          <Collapse in={open}>
            <Alert
              variant="filled"
              severity="info"
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
              sx={{ mb: 2 }}
            >
              Notification: Connect your MetaMask wallet.
            </Alert>
          </Collapse>
        </Box>
        <div>
          <ShowCard />
        </div>
        <div
          style={{ maxHeight: "200vh", maxWidth: "100vw", overflow: "auto" }}
        >
          <Typography variant="h4" gutterBottom>
            Explore Projects
          </Typography>
          <Grid container spacing={2}>
            <DonationCards cardNumber={4} />
          </Grid>
        </div>
      </Stack>
    </div>
  );
}
