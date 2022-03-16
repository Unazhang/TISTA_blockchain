import React from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Form } from "../useForm";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function TabPanel(props) {
  // spread out
  const { children, value, index, ...other } = props;
  return (
    <div
      // role="tabpanel"
      hidden={value !== index}
      // id={`simple-tabpanel-${index}`}
      // aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

function BuySell() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        // aria-label="secondary tabs example"
      >
        <Tab label="Buy" />
        <Tab label="Sell" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div className="form-group mr-sm-2">
          {/* <InputLabel>Name</InputLabel> */}
          <TextField
            variant="outlined"
            // helperText={this.state.helperText}
            // onChange={this.onChange.bind(this)}
            // error={this.state.error}
            required
            id="amount"
            label="Amount"
            className="mb-2"
            // inputRef={element => (this.amountRef = element)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" >Pay From</InputLabel>
            <Select labelId="demo-simple-select-label" variant="outlined" label="Pay From">
              <MenuItem value={10}>Account1</MenuItem>
              <MenuItem value={20}>Account2</MenuItem>
              <MenuItem value={30}>Account3</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button variant="contained" type="submit" className="mr-2">
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Buy
        </Button>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="form-group mr-sm-2">
          {/* <InputLabel>Name</InputLabel> */}
          <TextField
            variant="outlined"
            // helperText={this.state.helperText}
            // onChange={this.onChange.bind(this)}
            // error={this.state.error}
            required
            id="amount"
            label="Amount"
            // inputRef={element => (this.amountRef = element)}
          />
        </div>
        <Button variant="contained" type="submit" className="mr-2">
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Sell
        </Button>
      </TabPanel>
    </>
  );
}

export default BuySell;
