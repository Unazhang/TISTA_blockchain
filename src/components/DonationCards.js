import React, { useState, useEffect } from "react";
import DonationPopOver from "../pages/Donation/DonationPopOver";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { reaction } from "mobx";
import { donationStore } from "../pages/Donation/DonationStore";
import { Grid, Card, CardContent, CardActions } from "@material-ui/core";

function DonationCards({ cardNumber }) {
  let arr = [];
  const [events, setEvents] = useState([]);
  const API_BASE_URL = `http://localhost:4000`;

  const fetchDonations = async () => {
    try {
      const result = await axios.get(`${API_BASE_URL}/app/donation`);
      setEvents(result.data);
    } catch (error) {
      console.log("cannot fetch all projects", error);
    }
  };

  //   const fetchDonatedAddress = async () => {
  //     try {
  //       const result = await axios
  //         .get(`${API_BASE_URL}/app/donatedAddress`, {
  //           userName: localStorage.getItem("userName"),
  //         })
  //         .then((res) =>
  //           console.log(
  //             "donatiedAddress",
  //             localStorage.getItem("userName"),
  //             res,
  //             localStorage.getItem("userName")
  //           )
  //         );
  //       // setEvents(result.data);
  //     } catch (error) {
  //       console.log("error");
  //     }
  //   };

  reaction(
    () => donationStore.isUpdate,
    async (isUpdate) => {
      if (isUpdate) {
        donationStore.isUpdate = false;
        await fetchDonations();
        // await fetchDonatedAddress();
      } else {
        console.log("autorun !false");
      }
    }
  );

  useEffect(() => {
    fetchDonations();
    // fetchDonatedAddress();
  }, []);

  if (events.length !== 0) {
    const arrLength = cardNumber === 0 ? events.length : cardNumber;
    for (let i = 0; i < arrLength; i++) {
      if (events[i].blockchainAddress.length > 0) {
        arr.push(
          <Grid item xs={12} sm={6}>
            <Grid container>
              <Grid
                item
                style={{
                  width: "50%",
                  height: "100%",
                  backgroundSize: "contained",
                }}
              >
                <Card style={{ width: 300, margin: "auto", height: 200 }}>
                  <img
                    src={events[i].imageUrl}
                    width="100%"
                    height="100%"
                    alt=""
                  />
                </Card>
              </Grid>
              <Grid item style={{ width: "50%", height: "100%" }}>
                <Card variant="outlined" style={{ width: 300, height: 200 }}>
                  <CardContent
                    style={{
                      height: "80%",
                      ordWrap: "break-word",
                      display: "block",
                      overflow: "hidden",
                      whiteSpace: "normal",
                    }}
                  >
                    {/* <ShowImage url={events[i].imageUrl} /> */}
                    <Typography
                      id="title"
                      gutterBottom
                      variant="h6"
                      style={{ fontSize: "2.5vh" }}
                    >
                      {events[i].title}
                    </Typography>
                    <Typography
                      noWrap
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <b>{events[i].current_amount} raised</b> of{" "}
                      {events[i].target_amount} XYZ Token
                    </Typography>
                    <Typography
                      noWrap
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Blockchain Address: {events[i].blockchainAddress}
                    </Typography>
                    <Typography
                      noWrap
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {" "}
                      Description:
                      {events[i].description}
                    </Typography>
                  </CardContent>
                  <CardActions
                    style={{
                      height: "80%",
                      ordWrap: "break-word",
                      display: "block",
                      overflow: "hidden",
                      whiteSpace: "normal",
                    }}
                  >
                    <DonationPopOver
                      amount={
                        events[i].current_amount +
                        " raised of " +
                        events[i].target_amount
                      }
                      address={events[i].blockchainAddress}
                      content={events[i].description}
                      request_id={events[i]._id}
                      blockchainAddress={events[i].address}
                      current_amount={events[i].current_amount}
                      target_amount={events[i].target_amount}
                      requester_name={events[i].requester_name}
                      req_title={events[i].title}
                      description={events[i].description}
                      donation_history={events[i].donation_history}
                      vendor_name={events[i].vendor_name}
                    />
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        );
      }
    }
  }

  return arr;
}

DonationCards.defaultProps = {
  cardNumber: 0,
};

export default DonationCards;
