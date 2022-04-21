import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box, makeStyles, OutlinedInput } from "@material-ui/core";
import { Stack, Button } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ValidationCards from "./ValidationCards";

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

const Input = styled("input")({
  display: "none",
});

function ValidationForm() {
  const classes = useStyles();

  const [displayCards, setdisplayCards] = useState(true);
  const handleSubmit = (event) => {
    setdisplayCards(!displayCards);
  };

  return (
    <div>
      <div>
        {displayCards ? (
          <ValidationCards
            setdisplayCards={() => {
              setdisplayCards(!displayCards);
            }}
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
              <div
                style={{
                  width: "900px",
                  height: "174px",
                  marginTop: "20px",
                  fill: "white",
                  borderRadius: "10px",
                  stroke: "solid",
                }}
              >
                <Typography variant="body1" component="div">
                  Briefly state your reason for validation:
                </Typography>
                <OutlinedInput
                  placeholder="Type in here"
                  fullWidth
                  className={classes.textF}
                  multiline
                  rows={5}
                ></OutlinedInput>
              </div>
              <div>
                <Stack direction="row" spacing={2}>
                  <label htmlFor="add-file">
                    <Input
                      accept="image/*"
                      id="add-file"
                      multiple
                      type="file"
                    />
                    <Button variant="contained" component="span">
                      Add File
                    </Button>
                  </label>
                  <label htmlFor="submit">
                    <Button onClick={handleSubmit} variant="contained">
                      Submit
                    </Button>
                  </label>
                </Stack>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "& > :not(style)": {
                      m: 1,
                    },
                    width: 800,
                    maxWidth: "100%",
                  }}
                ></Box>
                {/* <br></br> */}

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

export default ValidationForm;
