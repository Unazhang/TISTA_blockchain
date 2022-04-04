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
import Popover from "@material-ui/core/Popover";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

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

  // donation instruction control

  const [expanded, setExpanded] = React.useState();

  const handleChangeInstr = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
              <Typography>Goal: {data.target_amount} XYZ Token</Typography>
              <Typography>
                Amount Raised: {data.current_amount} XYZ Token
              </Typography>
              <Typography variant="h6">Donation History</Typography>
              <Typography>{data.donation_history}</Typography>
            </Card>
          </Grid>
          <Grid item xs={10}>
            <div>
              <Button
                aria-describedby={id}
                color="primary"
                onClick={handleClick}
              >
                See instructions
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                PaperProps={{
                  style: {
                    width: "30vw",
                    height: "30vh",
                    overflow: "scroll",
                  },
                }}
              >
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChangeInstr("panel1")}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography>Step 1</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Install MetaMask wallet extension on your browser.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleChangeInstr("panel2")}
                >
                  <AccordionSummary
                    aria-controls="panel2d-content"
                    id="panel2d-header"
                  >
                    <Typography>Step 2</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      If you don't enough balance in your MetaMask wallet, add
                      balance first.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={handleChangeInstr("panel3")}
                >
                  <AccordionSummary
                    aria-controls="panel3d-content"
                    id="panel3d-header"
                  >
                    <Typography>Step 3</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Enter the amount in XYZ Token that you'd like to donate
                      and click <b>Donate</b> button.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel4"}
                  onChange={handleChangeInstr("panel4")}
                >
                  <AccordionSummary
                    aria-controls="panel4d-content"
                    id="panel4d-header"
                  >
                    <Typography>Step 4</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      In the MetaMask pop-up window, confirm your transaction.{" "}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Popover>
            </div>
            <Card
              style={{
                backgroundColor: "#e3f2fd",
              }}
            >
              <CardHeader title="Donate" />
              <Send {...props} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
