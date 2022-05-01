import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    fontSize: "2.2vh",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const styles = (theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: "24px",
  },

  card: {
    display: "grid",
    gridTemplateRows: "1fr auto",
    gridGap: "8px",
    minHeight: 280,
    backgroundImage: `url(https://via.placeholder.com/100x200)`,
    backgroundSize: "cover",
  },

  body: {
    alignSelf: "end",
    textAlign: "center",
  },

  actions: {
    // display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
});

export default function DonationPopOver(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // handle donate button
  const history = useHistory();
  const { currentUser } = useAuth();

  const handleClickDonate = (props) => {
    if (!currentUser) {
      history.push("/signup");
    } else {
      const request_id = props.request_id;
      console.log("inside donate", props);
      const data = {
        request_id: props.request_id,
        blockchainAddress: props.address,
        current_amount: props.current_amount,
        target_amount: props.target_amount,
        requester_name: props.requester_name,
        req_title: props.req_title,
        description: props.description,
        donation_history: props.donation_history,
        vendor_name: props.vendor_name,
        vendor_email: props.vendor_email,
        requester_email: props.requester_email,
        imageUrl: props.imageUrl,
        projectImage: props.projectImage,
      };
      console.log(data);
      history.push({
        pathname: "/make-a-donation",
        state: data,
      });
    }
  };

  return (
    <div className={styles.actions}>
      <Box spacing="2" component="span">
        <span>&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;</span> <span>&nbsp;&nbsp;</span>
        <Button
          size="medium"
          variant="outlined"
          onClick={handleClick}
          style={{
            maxWidth: "200px",
            maxHeight: "50px",
            minWidth: "200px",
            minHeight: "50px",
            borderColor: "#0F42AF",
            color: "#0F42AF",
          }}
        >
          Learn More
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          PaperProps={{
            style: { width: "30vw", height: "20vh", overflow: "scroll" },
          }}
        >
          <Typography className={classes.typography}>{props.amount}</Typography>
          <Typography className={classes.typography}>
            Address: {props.address}
          </Typography>
          <Typography
            className={classes.typography}
            style={{ wordWrap: "break-word" }}
          >
            {props.content}
          </Typography>
        </Popover>
        <span>&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;</span>
        <Button
          size="medium"
          variant="contained"
          style={{
            maxWidth: "200px",
            maxHeight: "50px",
            minWidth: "200px",
            minHeight: "50px",
            backgroundColor: "#0F42AF",
            color: "#FFFFFF",
          }}
          onClick={() => {
            handleClickDonate(props);
          }}
        >
          Donate
        </Button>
      </Box>
    </div>
  );
}
