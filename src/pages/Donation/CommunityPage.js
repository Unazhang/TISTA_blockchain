import React, { useState } from "react";
import DonationReqForm from "../RequestDonation/RequestDonation";
import { makeStyles } from "@material-ui/core";
import Controls from "../../controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../Popup";
import Send from "./send.js";
import AllProjects from "./AllProjects.js";
import Typography from "@material-ui/core/Typography";
import DetectAccount from "./DetectAccount";
import "./Donation.css";
import poster from "./poster.jpeg";
import { Box, Grid } from "@mui/material";
import DonationCards from "../../components/DonationCards";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
  },
  newButton: {
    verticalAlign: "top",
    borderRadius: "45px",
    width: "15vw",
    height: "9vh",
    marginTop: "30px",
  },
}));

export default function CommunityPage() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenDonate] = useState(false);
  const [openDonreq, setDonreq] = useState(false);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = (resetForm) => {
    resetForm();
    setRecordForEdit(null);
    setOpenDonate(false);
    setDonreq(false);
  };

  return (
    <div
      style={{
        maxHeight: "200vh",
        maxWidth: "100vw",
        overflow: "auto",
        left: "50px",
        right: "50px",
      }}
    >
      <Box sx={{ ml: 20, mr: 20 }}>
        <Typography variant="h6">Explore Projects</Typography>
        <Typography
          fontSize={"100%"}
          fontFamily={"sans-serif"}
          fontWeight={"500"}
        >
          You have brains in your head. You have feet in your shoes. You can
          steer yourself any direction you choose. You're on your own. And you
          know what you know. And YOU are the one who'll decide where to go.
        </Typography>
        <br />
      </Box>
      <Box sx={{ ml: 20, mr: 20 }}>
        <Grid container spacing={3}>
          <DonationCards />
        </Grid>
      </Box>
    </div>
  );
}
