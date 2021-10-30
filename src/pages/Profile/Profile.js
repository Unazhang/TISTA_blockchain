import React, { useState } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import { makeStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import pholder from './avatar.png'
import UploadButtons from '../Donation/upload';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';





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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        height:'75vh'
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '100%'
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    paymentCard: {
        marginBottom: theme.spacing(2)
    }
}));

export default function Profile() {
    
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className={classes.root}>
    <div><Typography variant="h6" id="tableTitle" component="div">Settings</Typography> </div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Validation" {...a11yProps(1)} />
          <Tab label="Security" {...a11yProps(2)} />
          <Tab label="Contact" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
            <div>
                <Typography variant="h6" component="div">User A's Profile</Typography>
                <div style={{display: 'inline-block'}}>
                    <Avatar alt="PlaceHolder" src={pholder} className={classes.large} />
                </div>
                <div style={{display: 'inline-block'}}>
                    <Typography variant="body1" component="div">Change/Upload Profile Picture</Typography>
                    <UploadButtons/>
                </div>
            </div>
            <div>
                <Typography variant="h6" component="div">Payment Method</Typography>
                <Button variant="contained" color="primary">Add A Payment Method</Button>
                
                <Card className={classes.paymentCcard}>
                <CardContent>
                    <Typography variant="body1" component="div">Account 1: xxxxxxxx</Typography>
                    <IconButton><RemoveIcon/></IconButton>
                </CardContent>
                </Card>

                <Card className={classes.paymentCard}>
                <CardContent>
                    <Typography variant="body1" component="div">Account 2: xxxxxxxx</Typography>
                    <IconButton><RemoveIcon/></IconButton>
                </CardContent>
                </Card>
            </div>
      </TabPanel>
    </div>
  );
}