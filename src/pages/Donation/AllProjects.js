import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { makeStyles, Toolbar, InputAdornment } from "@material-ui/core";
import Controls from "../../controls/Controls";
import { Search } from "@material-ui/icons";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { reaction } from "mobx";
import { observer } from "mobx-react-lite";
import { donationStore } from "./DonationStore";
import DonationAccordion from "./DonationAccordion";
import "./Donation.css";
import DonationPopOver from "./DonationPopOver";
import Popover from "@material-ui/core/Popover";
import Modal from "@mui/material/Modal";
import DonationProgress from "./DonationProgress";

const Data = [
  { name: "Help Kids" },
  { name: "Help Kids" },
  { name: "Help Veterans" },
  { name: "Help Veterans" },
  { name: "Treat Cancer" },
  { name: "Treat Cancer" },
  { name: "Education Support" },
  { name: "Education Support" },
  { name: "Unintentional Injury" },
  { name: "Unintentional Injury" },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F5F9FF",
    height: "80vh",
    width: "60vw",
    borderRadius: "25px",
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: "2%",
  },
}));

export default function AllProjects() {
  const [name, setName] = useState("");
  const [found, setFound] = useState(Data);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  let arr = [];
  const [events, setEvents] = useState([]);
  const API_BASE_URL = `http://localhost:4000`;

  const fetchDonations = async () => {
    try {
      const result = await axios.get(`${API_BASE_URL}/app/donation`);
      setEvents(result.data);
    } catch (error) {
      console.log("cannot fetch all projects", error);
    }
  };

  // const fetchDonatedAddress = async () => {
  //   try {
  //     const result = await axios
  //       .get(`${API_BASE_URL}/app/donatedAddress`, {
  //         userName: localStorage.getItem("userName"),
  //       })
  //       .then((res) =>
  //         console.log(
  //           "donatiedAddress",
  //           localStorage.getItem("userName"),
  //           res,
  //           localStorage.getItem("userName")
  //         )
  //       );
  //     // setEvents(result.data);
  //   } catch (error) {
  //     console.log("error");
  //   }
  // };

  reaction(
    () => donationStore.isUpdate,
    async (isUpdate) => {
      if (isUpdate) {
        donationStore.isUpdate = false;
        await fetchDonations();
        // await fetchDonatedAddress();
      } else {
        console.log("autorun !false");
      }
    }
  );

  useEffect(() => {
    fetchDonations();
    // fetchDonatedAddress();
  }, [null]);

  for (let i = 0; i < events.length; i++) {
    const progressData = {
      current_amount: events[i].current_amount,
      target_amount: events[i].target_amount,
      remaining_amount: events[i].target_amount - events[i].current_amount,
      chartHeight: 150,
    };
    arr.push(
      <Grid item xs={40} sm={6}>
        <Card variant="outlined" style={{ height: "50vh" }}>
          <CardContent
            style={{
              height: "40vh",
              ordWrap: "break-word",
              display: "block",
              overflow: "hidden",
              whiteSpace: "normal",
            }}
          >
            <Typography
              id="title"
              gutterBottom
              variant="h6"
              style={{ fontSize: "2.5vh" }}
            >
              {events[i].title}
            </Typography>
            <Card style={{ height: "auto", width: "auto" }}>
              <DonationProgress {...progressData} />
            </Card>
            <Typography
              nowrap
              className={classes.heading}
              noWrap
              variant="body2"
              color="textSecondary"
              // component="p"
            >
              <br />
              <b>Description: </b>
              {events[i].description}
            </Typography>
          </CardContent>
          <CardActions>
            <DonationPopOver
              amount={
                events[i].current_amount +
                " raised of " +
                events[i].target_amount
              }
              address={events[i].blockchainAddress}
              content={events[i].description}
              request_id={events[i]._id}
              blockchainAddress={events[i].address}
              current_amount={events[i].current_amount}
              target_amount={events[i].target_amount}
              requester_name={events[i].requester_name}
              req_title={events[i].title}
              description={events[i].description}
              donation_history={events[i].donation_history}
              vendor_name={events[i].vendor_name}
            />
          </CardActions>
        </Card>
      </Grid>
    );
  }

  // const [openDonate, setOpenDonate] = React.useState(false);

  // useEffect(() => {
  //   setOpenDonate(true);
  // }, [openDonate]);

  // const handleOpenDonate = (props) => {
  //   console.log(props);
  //   console.log("openDate status", openDonate);
  //   setOpenDonate(true);
  //   console.log("openDate status2", openDonate);
  // };

  // const handleCloseDonate = () => {
  //   setOpenDonate(false);
  // };

  const handleSearch = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = Data.filter((d) => {
        return d.name.toLowerCase().includes(keyword.toLowerCase());
      });

      setFound(results);
    } else {
      setFound(Data);
    }
    setName(keyword);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Toolbar>
        <Controls.Input
          label="Search"
          className={classes.searchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
      </Toolbar>
      <div style={{ maxHeight: "55vh", overflow: "auto" }}>
        <Grid container spacing={3}>
          {arr}
        </Grid>
      </div>
    </div>
  );
}
