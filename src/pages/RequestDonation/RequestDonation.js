import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../controls/Controls";
import UploadButtons from "../Donation/upload";
import emailjs from "emailjs-com";
import axios from "axios";
import { donationStore } from "../Donation/DonationStore";
import { useAuth } from "../../contexts/AuthContext";
// import {
//   Form,
//   Input,
//   Button,
//   Radio,
//   Select,
//   Cascader,
//   DatePicker,
//   InputNumber,
//   TreeSelect,
//   Switch,
//   Dropdown,
//   Menu,
// } from "antd";
// import { DownOutlined, UserOutlined } from "@ant-design/icons";
// import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Form, Button, Select } from "react-bootstrap";

export default function RequestDonationForm(props) {
  // const { addOrEdit, recordForEdit } = props;
  const validate = () => {
    console.log("inside validate");
  };

  let title = "";
  let amount = 0;
  let description = "";
  let vendorEmail = "";
  let { currentUser } = useAuth();
  let userEmail = currentUser.email;
  let category = "";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inside submit");
    console.log("e.target", e.target);

    if (validate()) {
      console.log("is validated");
      // addOrEdit(values, resetForm);
      axios
        .post("http://localhost:4000/app/request", {
          title: title,
          description: description,
          amount: amount,
          category: category,
          userEmail: userEmail,
          vendorEmail: vendorEmail,
        })
        .catch((err) => {
          console.log(err);
        })
        .then((e) => {
          // send validation email to vendor
          sendEmailToVendor(e);
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
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Where do you live?</Form.Label>
          <Form.Control as="select">
            <option value="US">United States</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>What are you fundraising for?</Form.Label>
          <Form.Control as="select">
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
          <Form.Control type="text" name="title" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Amount Needed (in XYZ token)</Form.Label>
          <Form.Control type="number" name="amount" />
        </Form.Group>
        <Form.Group>
          <Form.Label>What's your name?</Form.Label>
          <Form.Control type="text" name="requestor_name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>What's your vendor's name?</Form.Label>
          <Form.Control type="text" name="vendor_name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>What's your vendor's email?</Form.Label>
          <Form.Control type="email" name="vendor_email" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Message to your vendor:</Form.Label>
          <Form.Control as="textarea" rows={3} name="message" />
        </Form.Group>
        <Form.Group>
          {/* <Controls.Button type="submit" text="Notify Vendor" /> */}
          {/* <Controls.Button type="submit" text="Submit" /> */}
          <Button variant="primary" type="submit">
            Submit and Notify Vendor
          </Button>
        </Form.Group>
        {/* <Form.Group>
          <Controls.Button text="Reset" color="default" onClick={resetForm} />
        </Form.Group> */}
      </Form>
    </div>
  );
}
