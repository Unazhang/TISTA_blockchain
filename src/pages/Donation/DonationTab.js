import React, { useState } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";
import { makeStyles, Toolbar, InputAdornment } from '@material-ui/core';
import Controls from '../../controls/Controls';
import { Search } from "@material-ui/icons";
import { Table , TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';



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
    }
}));

export default function DonationTab() {
    
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [setFilterFn] = useState({ fn: items => { return items; } })
  let arr = [];
    for (let i = 0; i < 4; i++) {
        arr.push(
        <Grid item xs={12} sm={6}>
            <Card variant="outlined">
                <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">Please Help</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">Placeholder
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">Learn More</Button>
            </CardActions>
            </Card>
        </Grid>);
    }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value == "")
                return items;
            else
                return items.filter(x => x.fullName.toLowerCase().includes(target.value))
        }
    })
}

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
          <Tab label="Community" {...a11yProps(0)} />
          <Tab label="Donation" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
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
            {arr}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Table aria-label="simple table">
            <TableHead>
            <Typography variant="h6" id="tableTitle" component="div">Donation History</Typography>
                <TableRow>
                <TableCell align="right">Recipient Address</TableCell>
                <TableCell align="right">Amount</TableCell>
                </TableRow>
            </TableHead>
            <TableBody> 
                {/* { this.state.transactions.map((tx, key) => {
                    return (
                    <TableRow key={key}>
                    <TableCell align="right">{tx.returnValues.to}</TableCell>
                    <TableCell align="right">{window.web3.utils.fromWei(tx.returnValues.value.toString(), 'Ether')}</TableCell>
                    </TableRow>
                    )
                }) } */}
            </TableBody>
        </Table>
      </TabPanel>
    </div>
  );
}