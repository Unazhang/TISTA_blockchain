import React, { useState } from 'react'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import NotifIcon from "@material-ui/icons/Notifications";
import Divider from "@material-ui/core/Divider";
// https://material-ui.com/style/icons/
import HomeIcon from "@material-ui/icons/Home";
import HelpIcon from "@material-ui/icons/HelpOutlined";
import TransIcon from "@material-ui/icons/Payment";
import DonateIcon from "@material-ui/icons/CardGiftcard";
import NavLink from "./NavLink";
import Navbar from 'react-bootstrap/Navbar'
import Send from "../../pages/Donation/send.js";
import Controls from "../../controls/Controls";
import Popup from "../../pages/Popup";
import { useHistory } from 'react-router-dom';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
// https://material-ui.com/style/icons/
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import authService from "../../service/authService";
import { Link } from 'react-router-dom';

// https://material-ui.com/demos/drawers/#full-height-navigation
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: '100%',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  navbutton:{
    width:200
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

function MainLayout(props) {
  const { classes, children } = props;
  const [openPopup, setOpenDonate] = useState(false)

  const his = () => {
    const history = useHistory();
    history.push('/login');
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.navbutton}>
          <NavLink activeOnlyWhenExact to="/" icon={HomeIcon} >Home
          </NavLink></div>
          <div className={classes.navbutton}>
          <NavLink to="/transaction" icon={TransIcon}>
            Transaction
          </NavLink></div>
          <div className={classes.navbutton}>
          <NavLink to="/donation" icon={DonateIcon}>
            Donation
          </NavLink></div>
          <NavLink to="/login" handleClick={() => {authService.logOut();}} icon={HelpIcon}>
            log out
          </NavLink>
          <div style={{ display: "flex", flex: 1 }} />
          <Button variant="contained" color="primary">Buy/Sell</Button>
          <Controls.Button
                    text="SEND"
                    variant="contained"
                    color="primary"
                    className={classes.newButton}
                    onClick={() => { setOpenDonate(true); }}
          />
          <IconButton><NotifIcon /></IconButton>
          <IconButton 
              component={Link}
              to='/profile'><ProfileIcon /></IconButton>
        </Toolbar>
      </AppBar>

      <Popup
            title="Send"
            open={openPopup}
            handleClose={setOpenDonate}
        >
            <Send/>
        </Popup>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainLayout);
