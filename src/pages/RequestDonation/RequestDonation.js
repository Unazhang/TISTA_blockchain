import React, { useState, useEffect, useContext } from "react";
import { FormLabel, Grid } from "@material-ui/core";
import Controls from "../../controls/Controls";
import UploadButtons from "../Donation/upload";
import emailjs from "emailjs-com";
import axios from "axios";
import { donationStore } from "../Donation/DonationStore";
import { useAuth } from "../../contexts/AuthContext";
import { Form, Select, Card } from "react-bootstrap";
import Button from "@material-ui/core/Button";

export default function RequestDonationForm(props) {
  // const { addOrEdit, recordForEdit } = props;
  const validate = () => {
    console.log("inside validate");
    return true;
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

  let { currentUser } = useAuth();
  let user_email = currentUser.email;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inside submit");

    sendEmailToVendor(e);
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
      imageUrl: imageUrl,
    };

    console.log("data", data);
    if (validate()) {
      console.log("is validated");
      console.log("title++++++++", title);
      // addOrEdit(values, resetForm);
      axios
        .post("http://localhost:4000/app/request", data)
        .catch((err) => {
          console.log(err);
        })
        .then((e) => {
          // send validation email to vendor
        })
        .then(() => (donationStore.isUpdate = true));
      // resetForm();
    }
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
      <Card style={{ width: "50rem" }} border="light">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <FormLabel>Add Image</FormLabel>
            <Form.Control
              type="text"
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </Form.Group>
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
            <Form.Label>Fundraiser Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
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
            <Form.Label>What's your name?</Form.Label>
            <Form.Control
              type="text"
              name="requester_name"
              onChange={(e) => setReqName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>What's your vendor's name?</Form.Label>
            <Form.Control
              type="text"
              name="vendor_name"
              onChange={(e) => setVendorName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>What's your vendor's email?</Form.Label>
            <Form.Control
              type="email"
              name="vendor_email"
              onChange={(e) => setVendorEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Message to your vendor:</Form.Label>
            <Form.Control as="textarea" rows={3} name="message" />
          </Form.Group>
          <Form.Group>
            {/* <Controls.Button type="submit" text="Notify Vendor" /> */}
            {/* <Controls.Button type="submit" text="Submit" /> */}
            <Button variant="contained" color="primary" type="submit">
              Submit and Notify Vendor
            </Button>
          </Form.Group>
          {/* <Form.Group>
          <Controls.Button text="Reset" color="default" onClick={resetForm} />
        </Form.Group> */}
        </Form>
      </Card>
    </div>
  );
}
