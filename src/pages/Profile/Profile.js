import React, { useState } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import { makeStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import pholder from './avatar.png'
import UploadButtons from '../Donation/upload';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import {Toolbar, InputAdornment } from '@material-ui/core';
import Controls from '../../controls/Controls';
import { Search } from "@material-ui/icons";
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Popup from "../../pages/Popup";

const Data = [
  {name: 'Jack', status: 'Verified Vender'},
  {name: 'Lucy', status: 'Verified Receiver'},
  {name: 'Lee', status: 'Verified Receiver'},
  {name: 'Lucy', status: 'Verified Receiver'},
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
  const [name, setName] = useState('');
  const [found, setFound] = useState(Data);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [submit, setSubmit] = useState(false);

  const handleSearch = e => {
    const keyword = e.target.value;
    console.log("input is ",keyword)
    if (keyword !== '') {
      const results = Data.filter((d) => {
        return d.name.toLowerCase().includes(keyword.toLowerCase());
      });
      
      setFound(results);
    } else {
      setFound(Data);
    }
    setName(keyword);
  }
  
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSubmit = (event) => {
    setSubmit(!submit)
  }
  

  return (
    <div className={classes.root}>
    <div><Typography variant="h6" id="tableTitle" component="div">Settings</Typography> </div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Validation" {...a11yProps(1)} />
          <Tab label="Contact" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
            <div>Status: not validated
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
      <TabPanel value={value} index={1}>
            <div>
            <div>
              {/* {submit?<h1>1</h1>:<h1>2</h1>} */}
              {submit?<div>
            <Typography variant="h6" component="div">Validate your identity</Typography>
            <Card className={classes.paymentCcard}>
                <CardContent>
                <div style={{display: 'inline-block'}}>
                    <Avatar alt="PlaceHolder" src={pholder} className={classes.large} />
                </div>
                <div style={{display: 'inline-block', marginLeft:'10px'}}>
                    <Typography variant="body1" component="div">Lee</Typography>
                </div>
                <div style={{display: 'inline-block', marginLeft:'1000px'}}>
                    <IconButton><RemoveIcon/></IconButton>
                </div>
                </CardContent>
                </Card>
                <Typography variant="body1" component="div">Add another validation or add more documents?</Typography>
                <br></br>
                <Button onClick={handleSubmit} size="large" style={{display: 'inline-block'}} variant="contained" color="primary">Add Validation</Button>
                <br></br>
                <br></br>
                  <Button size="small" color="#bbdefb" variant="contained" component="span">
                    Upload Flie<UploadButtons/>
                  </Button>
            </div> :
            <div><Typography variant="h6" component="div">Validate your identity</Typography>
            <br></br>
            <div><Typography variant="body1" component="div"><b>User A</b> Status: not validated </Typography>
            <div style={{display: 'inline-block'}}>
            <TextField 
              fullWidth
              id="standard-multiline-static"
              label="Multiline"
              multiline
              rows={15}
              label="Brief statement of your reason for validation"
              id="Type in here"
              defaultValue="Type in here"
              variant="filled"
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& > :not(style)': { m: 1 },
                width: 800,
                maxWidth: '100%',
            }}
              >
            </Box>
            <br></br>
            <Button size="small" color="#bbdefb" variant="contained" component="span">
              Upload <UploadButtons/>
            </Button>
            <br></br>
            <br></br>
            <Button onClick={handleSubmit} size="large" style={{display: 'inline-block'}} variant="contained" color="primary">Submit</Button>
            <br></br>
            <br></br>
          </div></div></div>
            }
            </div>
            </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Toolbar>
            <Controls.Input
                label="Search"
                className={classes.searchInput}
                InputProps={{
                    startAdornment: (<InputAdornment position="start">
                        <Search />
                    </InputAdornment>)
                }}
                onChange={handleSearch}
            />
            
            
        </Toolbar>
        <Grid container spacing={3}>

          {/* {arr} */}
          {found && found.length > 0 ? (
            found.map((d) => (
                    <Grid item xs={12} sm={6}>
                    <Card variant="outlined">
                        <CardActionArea>
                        <CardContent>
                            <Typography id = "title" gutterBottom variant="h5" component="h2">{d.name}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{d.status}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Card>
                </Grid>
            ))
          ) : (
            <Grid item xs={12} sm={6}>
                    <Card variant="outlined">
                        <CardActionArea>
                        <CardContent>
                            <Typography id = "title" gutterBottom variant="h5" component="h2">No Result</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">Placeholder
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">Learn More</Button>
                    </CardActions>
                    </Card>
                </Grid>
          )}

        </Grid>

      </TabPanel>
    </div>
  );
}

