import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    fontSize: "2.2vh",
  },
}));

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
      };
      console.log(data);
      history.push({
        pathname: "/make-a-donation",
        state: data,
      });
    }
  };

  return (
    <div>
      <Button aria-describedby={id} variant="outlined" onClick={handleClick}>
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
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={() => {
          handleClickDonate(props);
        }}
      >
        Donate
      </Button>
    </div>
  );
}
