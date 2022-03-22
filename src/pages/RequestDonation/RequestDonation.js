import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../controls/Controls";
import { useForm, Form } from "../useForm";
import UploadButtons from "../Donation/upload";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import emailjs from "emailjs-com";

import axios from "axios";
import { donationStore } from "../Donation/DonationStore";

const initialFValues = {
  title: "",
  amount: 0,
  description: "",
  accountid: "",
  userID: "",
};

export default function RequestDonationForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("title" in fieldValues)
      temp.title =
        fieldValues.title.length > 0 ? "" : "This field is required.";
    if ("description" in fieldValues)
      temp.description =
        fieldValues.description.length > 0 ? "" : "This field is required.";
    if ("amount" in fieldValues)
      temp.amount =
        fieldValues.amount.length > 0 ? "" : "This field is required.";
    if ("accountid" in fieldValues)
      temp.accountid =
        fieldValues.accountid.length != 0 ? "" : "This field is required.";
    if ("vendorEmail" in fieldValues)
      temp.vendorEmail =
        fieldValues.vendorEmail.length > 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  let category = "";
  let handleCategoryChange = (e) => {
    category = e.target.value;
    console.log("category", category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // addOrEdit(values, resetForm);
      axios
        .post("http://localhost:4000/app/request", {
          userID: "",
          category: category,
          amount: values.amount,
          title: values.title,
          description: values.description,
        })
        .then(() => {
          // send validation email to vendor
          sendEmailToVendor();
        })
        .then(() => (donationStore.isUpdate = true));
      resetForm();
    }
  };

  const sendEmailToVendor = (e) => {
    e.preventDefault();
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

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <FormControl>
            <InputLabel>Where do you live?</InputLabel>
            <Select>
              <MenuItem>Select your country</MenuItem>
              <MenuItem value={"US"}>United States</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>What are you fundraising for?</InputLabel>
            <Select onChange={handleCategoryChange}>
              <MenuItem>Choose a category</MenuItem>
              <MenuItem value={1}>Accidents &amp; Emergencies</MenuItem>
              <MenuItem value={2}>Animals &amp; Pets</MenuItem>
              <MenuItem value={3}>Babies, Kids &amp; Family</MenuItem>
              <MenuItem value={4}>Community &amp; Neighbors</MenuItem>
              <MenuItem value={5}>Dreams, Hopes &amp; Wishes</MenuItem>
              <MenuItem value={6}>Education &amp; Learning</MenuItem>
              <MenuItem value={7}>Funerals &amp; Memorials</MenuItem>
              <MenuItem value={8}>Medical, Illness &amp; Healing</MenuItem>
              <MenuItem value={9}>Rent, Food &amp; Monthly Bills</MenuItem>
              <MenuItem value={10}>Sports, Teams &amp; Clubs</MenuItem>
              <MenuItem value={11}>Volunteer &amp; Service</MenuItem>
              <MenuItem value={12}>Other</MenuItem>
            </Select>
          </FormControl>
          <Controls.Input
            label="Description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
          />
          <Controls.Input
            label="Amount Needed (in XYZ token)"
            name="amount"
            value={values.amount}
            onChange={handleInputChange}
            error={errors.amount}
          />
          <div
            className="container border"
            style={{
              marginTop: "50px",
              width: "50%",
            }}
          >
            <h6>Enter Your Requested Service or Vendor Info</h6>
            <form
              style={{ margin: "5px  5px  5px 5px" }}
              onSubmit={sendEmailToVendor}
            >
              <label>Your Name</label>
              <input type="text" name="requestor_name" />
              <br />
              <label>Vendor Name</label>
              <input type="text" name="vendor_name" />
              <br />
              <label>Vendor Email</label>
              <input type="email" name="vendor_email" />
              <br />

              <label>Your Message</label>
              <textarea name="message" row="4" />
              <input type="submit" value="Send Email" />
            </form>
          </div>
          <Controls.Button type="submit" text="Submit" />
          <Controls.Button text="Reset" color="default" onClick={resetForm} />
        </Grid>
      </Grid>
    </Form>
  );
}
