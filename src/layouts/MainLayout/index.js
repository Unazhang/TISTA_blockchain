import React from "react";
import { useHistory } from 'react-router-dom';

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
// https://material-ui.com/style/icons/
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import HelpIcon from "@material-ui/icons/HelpOutlined";
import NavLink from "./NavLink";
import authService from "../../service/authService";

// https://material-ui.com/demos/drawers/#full-height-navigation
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
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
  const his = () => {
    const history = useHistory();
    history.push('/login');
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Title
          </Typography>
          <div style={{ display: "flex", flex: 1 }} />
          <Typography>Ethereum Wallet.</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <NavLink activeOnlyWhenExact to="/" icon={HomeIcon}>
            Home
          </NavLink>
          <NavLink to="/faq" icon={HelpIcon}>
            FAQ
          </NavLink>
          <NavLink to="/transaction" icon={HelpIcon}>
            Transaction
          </NavLink>
          <NavLink to="/login" handleClick={() => {authService.logOut();}} icon={HelpIcon}>
            log out
          </NavLink>
        </List>
      </Drawer>
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
