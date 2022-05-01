import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Box } from "@material-ui/core";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ProfileIcon from "@material-ui/icons/AccountCircle";
// import NotifIcon from "@material-ui/icons/Notifications";
// import Divider from "@material-ui/core/Divider";
// https://material-ui.com/style/icons/
import HomeIcon from "@material-ui/icons/Home";
// import HelpIcon from "@material-ui/icons/HelpOutlined";
// import TransIcon from "@material-ui/icons/Payment";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import NavLink from "./NavLink";
// import Navbar from "react-bootstrap/Navbar";
// import Send from "../../pages/Donation/send.js";
// import Controls from "../../controls/Controls";
// import Popup from "../../pages/Popup";
import { useHistory } from "react-router-dom";
// import Drawer from "@material-ui/core/Drawer";
// import List from "@material-ui/core/List";
// https://material-ui.com/style/icons/
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import authService from "../../service/authService";
import { Link } from "react-router-dom";
import RequireRole from "../../pages/RequireRole";
// import User from "../../pages/Profile/User";
// import Profile from "../../pages/Profile/Profile";
// import CloseIcon from "@material-ui/icons/Close";
// import {
//   Dialog,
//   // DialogTitle,
//   // DialogContent,
//   // makeStyles,
// } from "@material-ui/core";
// import Avatar from "@material-ui/core/Avatar";
// import pholder from "../../pages/Profile/avatar.png";
// https://material-ui.com/demos/drawers/#full-height-navigation

// import BuySell from "../../pages/BuySell/BuySell.js";
import { useAuth } from "../../contexts/AuthContext";
import Tooltip from "@mui/material/Tooltip";
import RequireNonAuth from "../../pages/RequireNonAuth";
import RequireAuth from "../../pages/RequireAuth";

const drawerWidth = 240;
const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: "100%",
    backgroundColor: "#194db0",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  navbutton: {
    width: 200,
    fontWeight: "bold",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "white",
    padding: theme.spacing.unit * 3,
  },
  newButton: {
    width: 150,
    height: 40,
    marginRight: 20,
    backgroundColor: "white",
    color: "#194db0",
    fontWeight: "bold",
  },
  large: {
    width: "100px",
    height: "100px",
  },
});

function MainLayout(props) {
  const { classes, children } = props;
  // const [openPopup, setOpenDonate] = useState(false);
  // const [openBuySell, setOpenBuySell] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  // const handleopenUser = () => {
  //   setOpenUser(true);
  // };

  // const handleCloseUser = () => {
  //   setOpenUser(false);
  // };

  const userEmail = currentUser == null ? null : currentUser.email;

  // handle log out
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  const handleSignup = () => {
    history.push("/signup");
  };

  const handleSignin = () => {
    history.push("/login");
  };

  // icons: icon={HomeIcon} icon={VolunteerActivismRoundedIcon} icon={RequestPageIcon}

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <img src="./tistalogo.png" width={125} height={35}></img>
          <div style={{ display: "flex", flex: 1 }} />
          <div className={classes.navbutton}>
            <NavLink activeOnlyWhenExact to="/">
              Home
            </NavLink>
          </div>
          <div className={classes.navbutton}>
            <NavLink to="/donation">Community</NavLink>
          </div>
          <div className={classes.navbutton}>
            <NavLink to="/request">Request</NavLink>
          </div>
          <RequireAuth>
            <Tooltip title="My Profile">
              <IconButton component={Link} to="/profile">
                <ProfileIcon style={{ fill: "white" }} />
              </IconButton>
            </Tooltip>
          </RequireAuth>
          <RequireAuth>
            <Button
              variant="text"
              onClick={handleLogout}
              style={{
                color: "white",
              }}
            >
              Log Out
            </Button>
          </RequireAuth>
          <RequireNonAuth>
            <Button
              variant="text"
              onClick={handleSignin}
              style={{
                color: "white",
              }}
            >
              Log in
            </Button>
          </RequireNonAuth>
          <RequireNonAuth>
            <Button
              variant="text"
              onClick={handleSignup}
              style={{
                color: "white",
              }}
            >
              Sign up
            </Button>
          </RequireNonAuth>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainLayout);
