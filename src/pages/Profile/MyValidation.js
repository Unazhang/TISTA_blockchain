import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Box,
  Button,
  TextField,
  makeStyles,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

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

const Input = styled('input')({
    display: 'none',
  });

function MyValidation() {
  const classes = useStyles();

  const [submit, setSubmit] = useState(false);
  const handleSubmit = (event) => {
    setSubmit(!submit);
  };

  return (
    <div>
      <div>
        {submit ? (
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
            <br></br>
            <div>
              <Card
                style={{
                  width: "621px",
                  height: "112px",
                  borderRadius: "5px",
                }}
                className={classes.paymentCcard}
              >
                <CardContent>
                  <div
                    style={{
                      display: "inline-block",
                      marginLeft: "20px",
                      marginTop: "10px",
                    }}
                  ></div>
                  <div
                    style={{
                      marginLeft: "100px",
                      marginTop: "-50px",
                      fontFamily: "Lato",
                      size: "24px",
                    }}
                  >
                    <Typography variant="body1" component="div">
                      Lee
                    </Typography>
                  </div>
                  <div
                    style={{
                      marginLeft: "400px",
                      marginTop: "-25px",
                      fontFamily: "Lato",
                      size: "16px",
                    }}
                  >
                    <Typography variant="body1" component="div">
                      In Progress
                    </Typography>
                  </div>
                  <div
                    style={{
                      marginLeft: "500px",
                      marginTop: "-35px",
                    }}
                  >
                    <IconButton>
                      <RemoveIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div
              style={{
                marginLeft: "700px",
                marginTop: "-110px",
                fontFamily: "Lato",
                size: "20px",
              }}
            >
              <Typography variant="body1" component="div">
                Add another validation or add more documents?
              </Typography>
            </div>
            <br></br>
            <Button
              onClick={handleSubmit}
              size="large"
              style={{
                display: "inline-block",
                marginLeft: "700px",
                marginTop: "0px",
                height: "48px",
              }}
              variant="contained"
              color="primary"
            >
              Add Validation
            </Button>
            <br></br>
            <br></br>
          </div>
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
            <br></br>
            <div>
              <div
                style={{
                  display: "inline-block",
                  fontFamily: "Lato",
                  size: "24px",
                }}
              >
                <Typography variant="body1" component="div">
                  <b>User A </b> Status: not validated{" "}
                  <HelpOutlineIcon></HelpOutlineIcon>
                </Typography>
              </div>

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
                <TextField
                  fullWidth
                  className={classes.textF}
                  // id="standard-multiline-static"
                  // label="Multiline"
                  multiline
                  rows_req={10}
                  label="Brief statement of your reason for validation"
                  id="Type in here"
                  defaultValue="Type in here"
                  variant="filled"
                />
              </div>
              <div>
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
                <br></br>
                <label htmlFor="add-file">
                  <Input
                    accept="image/*"
                    id="add-file"
                    multiple
                    type="file"
                  />
                  <Button
                    size="large"
                    variant="contained"
                    component="span"
                    color="#CEE2FF"
                    style={{
                      display: "inline-block",
                      width: "138px",
                      height: "48px",
                      marginTop: "70px",
                    }}
                  >
                    <div
                      style={{
                        marginLeft: "12px",
                        marginTop: "5px",
                      }}
                    >
                      Add File
                    </div>
                  </Button>

                  <div className="poster1">
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
                  <div className="poster2"></div>
                </label>
                <br></br>
                <br></br>
                <Button
                  onClick={handleSubmit}
                  size="large"
                  style={{
                    display: "inline-block",
                    width: "138px",
                    height: "48px",
                  }}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
                <br></br>
                <br></br>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyValidation;
