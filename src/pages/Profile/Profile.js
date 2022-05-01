import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
import { FormControl, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
// import UploadButtons from "../Donation/upload";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import RemoveIcon from "@material-ui/icons/RemoveCircle";
// import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
// import { Toolbar, InputAdornment } from "@material-ui/core";
// import Controls from "../../controls/Controls";
// import { Search } from "@material-ui/icons";
import CardActions from "@material-ui/core/CardActions";
// import CardActionArea from "@material-ui/core/CardActionArea";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CardHeader } from "@mui/material";
import { TableContainer } from "@material-ui/core";
import { Form, FormLabel } from "react-bootstrap";

import MyValidation from "./MyValidation";
import ValidationCards from "./ValidationCards";
import RequireRole from "../RequireRole";

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
    height: "629px",
    width: "1256px",
    borderRadius: "25px",
    marginLeft: "100px",
    font: "Lato",
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
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  medium: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  paymentCard: {
    marginBottom: theme.spacing(2),
  },
  textF: {
    "& .MuiFilledInput-root": {
      background: "rgb(255, 255, 255)",
    },
  },
}));

export default function Profile() {
  let { currentUser, name } = useAuth();
  let user_email = currentUser.email;

  // const [name, setName] = useState("");
  // const [found, setFound] = useState(Data);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [avatarUrl, setAvatarUrl] = useState("");

  // const handleSearch = (e) => {
  //   const keyword = e.target.value;
  //   console.log("input is ", keyword);
  //   if (keyword !== "") {
  //     const results = Data.filter((d) => {
  //       return d.name.toLowerCase().includes(keyword.toLowerCase());
  //     });

  //     setFound(results);
  //   } else {
  //     setFound(Data);
  //   }
  //   setName(keyword);
  // };

  const Input = styled("input")({
    display: "none",
  });

  // tab content -- My Request
  const API_BASE_URL = `http://localhost:4000`;

  const handleChange = (event, newValue) => {
    // console.log("newValue", newValue);
    setValue(newValue); // set tab index
    if (newValue == 0) {
      fetchProfile();
      fetchRequests();
    } else if (newValue == 1) {
      fetchDonationsByUser();
    } else if (newValue == 2) {
      // fetchRequests();
    }
  };

  const [events, setEvents] = useState([]);

  const fetchRequests = async () => {
    try {
      const result = await axios.get(`${API_BASE_URL}/app/donation`);
      setEvents(result.data);
    } catch (error) {
      console.log("cannot fetch all projects", error);
    }
  };

  // display request history

  function createData(
    id,
    created_on,
    title,
    vendor,
    current_amount,
    target_amount,
    status
  ) {
    return {
      id,
      created_on,
      title,
      vendor,
      current_amount,
      target_amount,
      status,
    };
  }
  let rows_req = [];
  for (let i = 0; i < events.length; i++) {
    if (events[i].user_email === user_email) {
      // const amount_usd = events[i].donated_amount * 0.25;
      rows_req.push(
        createData(
          i,
          events[i].date,
          events[i].title,
          events[i].vendor_name,
          events[i].current_amount,
          events[i].target_amount,
          "Verified"
        )
      );
    }
  }

  // tab content -- My Donation

  const [myDonations, setMyDonations] = useState([]);

  const fetchDonationsByUser = async () => {
    try {
      const result = await axios.get(
        `${API_BASE_URL}/app/find-donations-by-user`,
        {
          params: {
            email: user_email,
          },
        }
      );
      // console.log("result.data", result.data);
      setMyDonations(result.data);
    } catch (error) {
      console.log("cannot fetch donation records by user", error);
    }
  };

  // display my donation history

  function createDonations(id, donated_on, title, donated_amount, amountUSD) {
    return {
      id,
      donated_on,
      title,
      donated_amount,
      amountUSD,
    };
  }
  let rows_don = [];
  for (let i = 0; i < myDonations.length; i++) {
    rows_don.push(
      createDonations(
        i,
        myDonations[i].donated_on,
        myDonations[i].title,
        myDonations[i].donated_amount,
        myDonations[i].amountUSD
      )
    );
  }
  // get user avatar
  const fetchProfile = async () => {
    await axios
      .post(`${API_BASE_URL}/app/user`, {
        user_email: user_email
      })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        setAvatarUrl(res.data);
      });
  };

  useEffect(() => {
    fetchProfile();
    fetchRequests();
  }, []);

  const handleAvatarSubmit = async () => {
    await axios
      .post(`${API_BASE_URL}/app/change-avatar`, {
        user_email: user_email,
        avatarUrl: avatarUrl,
      })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        console.log("avatar change response", res);
        setAvatarUrl(avatarUrl);
      });
  };

  // get vendor's related projects

  const [blockchainAddress, setBlockchainAddress] = useState("");
  const [requestId, setRequestId] = useState("");

  const handleBlockchainAddressSubmit = async (e) => {
    e.preventDefault();
    const data = {
      blockchainAddress,
      _id: requestId,
    };
    console.log("handleBlockchainAddressSubmit", data);
    await axios
      .post(`${API_BASE_URL}/app/update-blockchain-address`, data)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        console.log(res);
      });
  };

  let arr = [];
  for (let i = 0; i < events.length; i++) {
    if (
      events[i].vendor_email === user_email &&
      events[i].blockchainAddress.length === 0
    ) {
      arr.push(
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item style={{ width: "50%", backgroundSize: "contained" }}>
              <Card style={{ width: 380, margin: "auto", height: 300 }}>
                <img
                  src={events[i].imageUrl}
                  width="100%"
                  height="100%"
                  alt=""
                />
              </Card>
            </Grid>
            <Grid item style={{ width: "50%", height: "100%" }}>
              <Card variant="outlined" style={{ width: 400, height: "100%" }}>
                <CardContent
                  style={{
                    height: "80%",
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
                    style={{ fontSize: "2vh", color: "red" }}
                  >
                    {events[i].title} project is waiting for your info......
                  </Typography>
                  <Typography
                    id="title"
                    gutterBottom
                    variant="h6"
                    style={{ fontSize: "2vh" }}
                  >
                    Requester: {events[i].requester_name}
                  </Typography>
                  <Typography
                    noWrap
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Target Amount:
                    {events[i].target_amount} XYZ Token
                  </Typography>
                  <Typography
                    noWrap
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {" "}
                    Description:
                    {events[i].description}
                  </Typography>
                  <br />
                  <Form onSubmit={handleBlockchainAddressSubmit}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Enter your blockchain address: "
                        onChange={(e) => {
                          setBlockchainAddress(e.target.value);
                          setRequestId(events[i]._id);
                        }}
                        style={{ width: "98%" }}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Button variant="contained" color="primary" type="submit">
                        Submit
                      </Button>
                    </Form.Group>
                  </Form>
                </CardContent>
                <CardActions
                  style={{
                    height: "80%",
                    ordWrap: "break-word",
                    display: "block",
                    overflow: "hidden",
                    whiteSpace: "normal",
                  }}
                ></CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      );
    }
  }

  console.log(user_email);

  return (
    <div>
      <div
        style={{
          color: "#000000",
          fontFamily: "Lato",
          size: "24px",
          marginLeft: "5px",
        }}
      >
        <Avatar alt="PlaceHolder" src={avatarUrl} className={classes.large} />
        <div
          style={{
            fontFamily: "Lato",
            size: "18px",
            marginTop: "-70px",
            marginLeft: "110px",
          }}
        >
          {name == null ? (
            <Typography variant="h6" component="div">
              Currently logged in as: John Doe
            </Typography>
          ) : (
            <Typography variant="h6" component="div">
              Currently logged in as: {name}
            </Typography>
          )}
          <br />
          <br />
        </div>
      </div>
      {/* <div className={classes.root}> */}
      <div
        style={{
          color: "#000000",
          fontFamily: "Lato",
          size: "24px",
          marginLeft: "5px",
        }}
      >
        <AppBar
          position="static"
          style={{
            backgroundColor: "#e3f2fd",
            color: "black",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            TabIndicatorProps={{
              style: {
                backgroundColor: "black",
              },
            }}
          >
            <Tab label="My Request" {...a11yProps(0)} />
            <Tab label="My Donation" {...a11yProps(1)} />
            <Tab label="My Validation" {...a11yProps(2)} />
            <Tab label="Setting" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Card>
            <CardHeader title="Donation History" />
            <TableContainer component={Paper}>
              <Table md={8} aira-label="Donation History">
                <TableHead>
                  <TableRow>
                    <TableCell>Created On</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Vendor</TableCell>
                    <TableCell>Amount Raised (XYZ Token)</TableCell>
                    <TableCell>Target Amount (XYZ Token)</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows_req.map((row) => (
                    <TableRow
                      key={row.i}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.created_on}
                      </TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">{row.vendor}</TableCell>
                      <TableCell align="left">{row.current_amount}</TableCell>
                      <TableCell align="left">{row.target_amount}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Card>
            <CardHeader title="Donation History" />
            <TableContainer component={Paper}>
              <Table md={8} aira-label="Donation History">
                <TableHead>
                  <TableRow>
                    <TableCell>Donated On</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Amount Donated (XYZ Token)</TableCell>
                    <TableCell>In USD</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows_don.map((row) => (
                    <TableRow
                      key={row.i}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.donated_on}
                      </TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">{row.donated_amount}</TableCell>
                      <TableCell align="left">{row.amountUSD}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MyValidation uid={currentUser.uid}></MyValidation>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Typography variant="h6" component="div">
            Update Personal Information
          </Typography>
          <br />
          <Form onSubmit={handleAvatarSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter new avatar url:"
                onChange={(e) => setAvatarUrl(e.target.value)}
                style={{ width: 550 }}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="outlined" color="primary" type="submit">
                Change Profile Picture
              </Button>
            </Form.Group>
          </Form>
          <br />
          <RequireRole requiredRole={["Vendor"]}>
            <div
              style={{
                display: "inline-block",
                fontFamily: "Lato",
                size: "20px",
                fontStyle: "Bold",
              }}
            >
              <Typography variant="h6" component="div">
                Update Blockchain Address (Vendor Only)
              </Typography>
            </div>
          </RequireRole>
          <RequireRole requiredRole={["Vendor"]}>
            <div>{arr}</div>
          </RequireRole>
        </TabPanel>
      </div>
    </div>
  );
}
