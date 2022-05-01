import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, makeStyles, OutlinedInput } from "@material-ui/core";
import { Stack, Button } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ValidationCards from "./ValidationCards";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paymentCard: {
    marginBottom: theme.spacing(2),
  },
  textF: {
    "& .MuiFilledInput-root": {
      background: "rgb(255, 255, 255)",
    },
  },
}));

// const Input = styled("input")({
//   display: "none",
// });

function MyValidation({ uid }) {
  const classes = useStyles();

  const [validationStatus, setValidationStatus] = useState({
    Donor: false,
    Requester: false,
    Vendor: false,
  });

  const [validationForm, setValidationForm] = useState({
    phoneNumber: 0,
    description: "null",
  });

  const handleChange = (input) => (e) => {
    setValidationForm({ ...validationForm, [input]: e.target.value });
  };

  const [displayCards, setdisplayCards] = useState(true);
  const [currentCard, setCurrentCard] = useState();

  const handleSubmit = async (event) => {
    setdisplayCards(!displayCards);

    try {
      // console.log(validationForm.phoneNumber);
      // console.log(validationForm.description);
      // console.log(currentCard);
      await axios.post("http://localhost:4000/app/validation", {
        phoneNumber: validationForm.phoneNumber,
        description: validationForm.description,
        role: currentCard,
        uid: uid,
      });

      setValidationStatus((prevState) => ({
        ...prevState,
        [currentCard]: true,
      }));
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(uid);

  // useEffect(() => {
  //   console.log(validationStatus);
  // }, [validationStatus]);

  async function queryValidationStatus() {
    const roles = ["Donor", "Vendor", "Requester"];
    
    try {
      const response = await axios.post("http://localhost:4000/app/validation", {
        uid: uid,
      });

      roles.forEach((element) => {
        if (response.data[element].added) {
          setValidationStatus((prevState) => ({
            ...prevState,
            [element]: true,
          }));
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    queryValidationStatus();
  }, []);
  //TODO validate phone number

  return (
    <div>
      <div>
        {displayCards ? (
          <ValidationCards
            setdisplayCards={() => {
              setdisplayCards(!displayCards);
            }}
            setCurrentCard={setCurrentCard}
            validationStatus={validationStatus}
          ></ValidationCards>
        ) : (
          <div
            style={{
              fontFamily: "Lato",
              size: "24px",
              fontStyle: "Bold",
            }}
          >
            <Typography variant="h6" component="div">
              Validate your identity
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body1" component="div">
                Enter your phone number:
              </Typography>
              <OutlinedInput
                placeholder="Phone Number"
                className={classes.textF}
                onChange={handleChange("phoneNumber")}
              ></OutlinedInput>
              <Typography variant="body1" component="div">
                Briefly state your reason for validation:
              </Typography>
              <OutlinedInput
                placeholder="Type in here"
                fullWidth
                className={classes.textF}
                onChange={handleChange("description")}
                multiline
                rows={5}
              ></OutlinedInput>
              <Stack direction="row" spacing={2}>
                {/* <label htmlFor="add-file">
                    <Input
                      accept="image/*"
                      id="add-file"
                      multiple
                      type="file"
                    />
                    <Button variant="contained" component="span">
                      Add File
                    </Button>
                  </label> */}
                <label htmlFor="submit">
                  <Button onClick={handleSubmit} variant="contained">
                    Submit
                  </Button>
                </label>
              </Stack>
            </Stack>
            <div>
              {/* <div className="poster1">
                    <div
                      style={{
                        display: "inline-block",
                        color: "white",
                        marginLeft: "30px",
                        marginTop: "20px",
                      }}
                    >
                      <HorizontalRuleIcon></HorizontalRuleIcon>
                    </div>
                  </div>
                  <div className="poster2"></div> */}
              {/* <br></br>
                <br></br>

                <br></br>
                <br></br> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyValidation;
