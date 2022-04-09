import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Toolbar, InputAdornment } from "@material-ui/core";
import Controls from "../../controls/Controls";
import { Search } from "@material-ui/icons";
import DonationAccordion from "./DonationAccordion";
import "./Donation.css";
import DonationCards from "../../components/DonationCards";

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

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

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

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <div className={classes.root}>
      <TabPanel value={value} index={0}>
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
        <div style={{ maxHeight: "200vh", overflow: "auto" }}>
          <Grid container spacing={2}>
            <DonationCards />
          </Grid>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h6" id="tableTitle" component="div">
          Donation History
        </Typography>
        <div style={{ maxHeight: "58vh", overflow: "auto" }}>
          <DonationAccordion />
        </div>
      </TabPanel>
    </div>
  );
}
