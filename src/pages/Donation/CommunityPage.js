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
    <>
      <div className="donationMain">
        <AllProjects />
      </div>
    </>
  );
}
