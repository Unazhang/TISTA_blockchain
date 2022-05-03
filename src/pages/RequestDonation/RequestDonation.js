import React, { useState, useEffect, useContext } from "react";
import {
  CardContent,
  CardHeader,
  FormLabel,
  Grid,
  Box,
} from "@material-ui/core";
import Controls from "../../controls/Controls";
import UploadButtons from "../Donation/upload";
import emailjs from "emailjs-com";
import axios from "axios";
import { donationStore } from "../Donation/DonationStore";
import { useAuth } from "../../contexts/AuthContext";
import { Form, Select, Card } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import Alert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";
import Popup from "../../components/Popup";

export default function RequestDonationForm(props) {
  const { role } = useAuth();
  // const { addOrEdit, recordForEdit } = props;
  const validate = () => {
    console.log("inside validate");
    console.log(role);
    if (role.length > 0 && role.includes("Requester")) {
      return true;
    } else {
      return false;
    }
  };
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [target_amount, setAmount] = useState(0);
  // requester and vendor info
  const [requester_name, setReqName] = useState("");
  const [vendor_name, setVendorName] = useState("");
  const [vendor_email, setVendorEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // redirect
  const [openSubmitPopUp, setOpenSubmitPopUp] = React.useState(false);
  const [openValidPopUp, setOpenValidPopUp] = React.useState(false);

  const history = useHistory();

  let { currentUser } = useAuth();
  let user_email = currentUser.email;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inside submit");

    let data = {
      user_email: user_email,
      requester_name: requester_name,
      country: country,
      category: category,
      title: title,
      description: description,
      target_amount: target_amount,
      vendor_name: vendor_name,
      vendor_email: vendor_email,
      imageUrl:
        imageUrl.length > 0
          ? imageUrl
          : "https://storage.googleapis.com/proudcity/sanrafaelca/uploads/2020/04/donate-image.png",
    };

    console.log("data", data);

    axios
      .post("http://localhost:4000/app/request", data)
      .catch((err) => {
        console.log(err);
      })
      .then((e) => {
        // send validation email to vendor
      })
      .then(() => (donationStore.isUpdate = true))
      .then(() => {
        if (validate()) {
          console.log("is validated");
          // console.log("title++++++++", title);
          setOpenSubmitPopUp(true);
          // addOrEdit(values, resetForm);
          // resetForm();
        } else {
          console.log("not validated");
          setOpenValidPopUp(true);
        }
      });

    sendEmailToVendor(e);
  };

  const sendEmailToVendor = (e) => {
    emailjs
      .sendForm(
        "service_x0a2x2c",
        "template_i2wd3gj",
        e.target,
        "wNuuz4ZgSEGiKm8Tr"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   if (recordForEdit != null)
  //     setValues({
  //       ...recordForEdit,
  //     });
  // }, [recordForEdit]);

  const [componentSize, setComponentSize] = useState("default");

  return (
    <div>
      <div>
        <Popup
          open={openSubmitPopUp}
          title="Your request has been submitted."
          content={
            <>
              We have sent your vendor an email about your request. <br />
              Please close this window and you will be redirected to the
              Community Page.
            </>
          }
          handleClose={() => {
            setOpenSubmitPopUp(false);
            history.push("/donation");
          }}
        ></Popup>
        <Popup
          open={openValidPopUp}
          title="Additional Action Required"
          content={
            <>
              Your request has been recorded. <br />
              Please validate yourself as a requester to finish the requesting
              process.
            </>
          }
          handleClose={() => {
            setOpenValidPopUp(false);
            history.push("/profile", { from: "RequestPage" });
          }}
        ></Popup>
      </div>
      <Box sx={{ ml: 10, mr: 10, mt: 0 }}>
        {" "}
        <Grid container noWrap spacing={6}>
          <Grid item md={8}>
            <Card style={{ width: "50rem" }} border="light">
              <Form onSubmit={handleSubmit}>
                <h3>Tell us about yourself</h3>
                <Alert severity="info">
                  Please note you must be a U.S. resident to request donation on
                  our website.{" "}
                </Alert>
                <br />
                <Form.Group>
                  <Form.Label>Where do you live?</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setCountry(e.target.value)}
                    width="100%"
                    disabled={true}
                  >
                    <option value="US">United States</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>What's your name?</Form.Label>
                  <Form.Control
                    type="text"
                    name="requester_name"
                    onChange={(e) => setReqName(e.target.value)}
                  />
                </Form.Group>
                <h3>Tell us about your request</h3>
                <Form.Group>
                  <Form.Label>What are you fundraising for?</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="0">Choose a category</option>
                    <option value="1">Accidents &amp; Emergencies</option>
                    <option value="2">Animals &amp; Pets</option>
                    <option value="3">Babies, Kids &amp; Family</option>
                    <option value="4">Community &amp; Neighbors</option>
                    <option value="5">Dreams, Hopes &amp; Wishes</option>
                    <option value="6">Education &amp; Learning</option>
                    <option value="7">Funerals &amp; Memorials</option>
                    <option value="8">Medical, Illness &amp; Healing</option>
                    <option value="9">Rent, Food &amp; Monthly Bills</option>
                    <option value="10">Sports, Teams &amp; Clubs</option>
                    <option value="11">Volunteer &amp; Service</option>
                    <option value="12">Other</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>What is the name of your request? </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Add description about your request</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Target Amount (XYZ Token)</Form.Label>
                  <Form.Control
                    type="number"
                    name="target_amount"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Add Image</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image url: "
                  />
                </Form.Group>
                <h3>Add third party vendor information</h3>
                <Alert severity="info">
                  For transparency reason, we only allow donors to send funds to
                  your vendor's account.{" "}
                </Alert>
                <br />
                <Form.Group>
                  <Form.Label>What is your vendor's name?</Form.Label>
                  <Form.Control
                    type="text"
                    name="vendor_name"
                    onChange={(e) => setVendorName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>What is your vendor's email?</Form.Label>
                  <Form.Control
                    type="email"
                    name="vendor_email"
                    onChange={(e) => setVendorEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Your message to your vendor:</Form.Label>
                  <Form.Control as="textarea" rows={3} name="message" />
                </Form.Group>
                <Form.Group>
                  {/* <Controls.Button type="submit" text="Notify Vendor" /> */}
                  {/* <Controls.Button type="submit" text="Submit" /> */}
                  <Alert severity="info">
                    Please note we will send your vendor an email upon your
                    submission.
                  </Alert>
                  <br />
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Form.Group>
                {/* <Form.Group>
          <Controls.Button text="Reset" color="default" onClick={resetForm} />
        </Form.Group> */}
              </Form>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card
              style={{
                backgroundColor: "#e3f2fd",
              }}
            >
              <CardHeader title="Submission Guidelines" />
              <CardContent>
                Lorem ipsum dolor sit amet, sit libris probatus at. No qui rebum
                discere voluptatum. Te solet admodum postulant cum, etiam
                perfecto abhorreant vix ut. Cu essent everti nec, ea illum elitr
                usu. Cu mea suavitate assueverit, cu populo everti maiorum quo,
                equidem inermis duo ut. Ex cum omnium perpetua partiendo.
                <br />d posse constituto mea. Te mea incorrupte liberavisse. Cum
                hinc quaerendum ne, quot timeam no quo. Detraxit patrioque
                interesset no pro, ei assum dictas vel. Eos ut saepe repudiandae
                dissentiunt, ius in laudem aeterno deterruisset, at eum iusto
                dolore vituperatoribus. Nam et mutat putant patrioque. <br />
                Ei accumsan ullamcorper vel, et eum dicta primis doctus. Enim
                indoctum vim ad, has ea erat autem. Vel illum corrumpit
                interesset ut, cum no eruditi vivendum laboramus. No sit malis
                fabulas assentior. <br />
                Ex eum mentitum ponderum, nonumy eripuit singulis at eum. At per
                meliore vocibus verterem, feugait iracundia voluptaria ei qui,
                pri id dicit euripidis. Accusamus suscipiantur sed an. Ad sale
                integre vituperatoribus eos. Cu phaedrum pertinacia usu. Sea eu
                tractatos accusamus assentior. Nam utinam dolores an, mandamus
                facilisis repudiare eu nam. Nec alia omnes mediocrem te, id
                tation facete sea. Errem volumus mel at.
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
