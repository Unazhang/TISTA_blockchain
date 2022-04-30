import React, { useState, useEffect } from "react";
import DonationPopOver from "../pages/Donation/DonationPopOver";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { reaction } from "mobx";
import { donationStore } from "../pages/Donation/DonationStore";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from "@material-ui/core";

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
          <Grid item xs={12} sm={6} alignContent={"center"}>
            <Grid container alignContent={"center"}>
              <Grid
                item
                style={{
                  width: "600px",
                  height: "100%",
                  backgroundSize: "contained",
                }}
                alignContent={"center"}
              >
                {/* testtttt */}
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={events[i].imageUrl}
                    alt={events[i].imageUrl}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {events[i].title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Description: </b>
                      {events[i].description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button> */}
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
                      requester_email={events[i].user_email}
                      req_title={events[i].title}
                      description={events[i].description}
                      donation_history={events[i].donation_history}
                      vendor_name={events[i].vendor_name}
                      vendor_email={events[i].vendor_email}
                    />
                  </CardActions>
                </Card>
                {/* testttt */}
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
