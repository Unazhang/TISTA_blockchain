import React, { Component } from "react";
import Web3 from "web3";
import axios from "axios";
import XYZ from "../Balance/abis/XYZ.json";
import { Form } from "../useForm";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { donationStore } from "./DonationStore";
import { Typography, Grid } from "@material-ui/core";
// import { Route, Redirect } from "react-router";
import CommunityPage from "./CommunityPage";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class Send extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      daiTokenMock: null,
      balance: 0,
      transactions: [],
      helperText: "",
      vendor_name: props.vendor_name,
      blockchainAddress: props.blockchainAddress,
      request_id: props.request_id,
      user_email: props.user_email,
      title: props.title,
      amoutUSD: 0,
      donor_name: "Anonymous",
      isUpdated: false,
    };

    console.log("props inside Send.js", props);
    this.transfer = this.transfer.bind(this);
  }

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const XYZAddress = "0x8b0070828f11247Ed1f479927df558a199342239"; // Replace DAI Address Here
    // const ETH_address = "0x2170ed0880ac9a755fd29b2688956bd959f933f8";
    const daiTokenMock = new web3.eth.Contract(XYZ.abi, XYZAddress);

    this.setState({ daiTokenMock: daiTokenMock });
    console.log("daiTokenMock----------------------", daiTokenMock);
    const balance = await daiTokenMock.methods
      .balanceOf(this.state.account)
      .call();

    this.setState({ balance: web3.utils.fromWei(balance.toString(), "Ether") });
    const transactions = await daiTokenMock.getPastEvents("Transfer", {
      fromBlock: 0,
      toBlock: "latest",
      filter: { from: this.state.account },
    });
    this.setState({ transactions: transactions });
    console.log(web3.utils.fromWei(balance.toString(), "Ether"));
  }

  async transfer(recipient, amount) {
    if (this.state.daiTokenMock == null) {
      alert(
        "Please log in your MetaMask before proceeding. Then refresh this page. "
      );
    } else {
      this.state.daiTokenMock.methods
        .transfer(recipient, amount)
        .send({ from: this.state.account })
        .on("transactionHash", () => {
          console.log("make-a-donation", recipient, this.amountRef.value);
          if (this.props.isDonation) {
            axios
              .post("http://localhost:4000/app/make-a-donation", {
                receiver: recipient,
                amount: this.amountRef.value,
                donor_name: this.state.donor_name,
                request_id: this.state.request_id,
                email: this.state.user_email,
                title: this.state.title,
              })
              .then(() => (donationStore.isUpdate = true))
              .then(() =>
                this.setState({
                  isUpdated: true,
                })
              );
          }
        });
    }
  }

  onChange(event) {
    if (event.target.value.length > 0) {
      console.log(event.target.value);
      this.setState({
        helperText: "",
        error: false,
        amountUSD: event.target.value * 0.25, // 1 ETH = 0.25 USD
      });
    } else {
      this.setState({ helperText: "Invalid format", error: true });
    }
  }

  handleNameChange(event) {
    if (event.target.value.length > 0) {
      console.log(event.target.value);
      this.setState({
        helperText: "",
        error: false,
        donor_name: event.target.value,
      });
    } else {
      this.setState({ helperText: "Invalid input", error: true });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const recipient = this.state.blockchainAddress;
    const amount = window.web3.utils.toWei(this.amountRef.value, "Ether");
    this.transfer(recipient, amount);
  }

  render() {
    let amountUSD = this.state.amountUSD;
    let isUpdated = this.state.isUpdated;

    // TODO: redirect page after completing a new donation
    if (isUpdated) {
      return (
        <Router>
          <Route>
            <Redirect to="/donation" component={CommunityPage} />
          </Route>
        </Router>
      );
    } else {
      return (
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group mr-sm-2">
            <Grid warp="nowrap">
              <TextField
                variant="outlined"
                helperText={this.state.helperText}
                onChange={this.onChange.bind(this)}
                error={this.state.error}
                required
                id="amount"
                label="Amount (XYZ Token)"
                inputRef={(element) => (this.amountRef = element)}
                style={{ width: 150 }}
              />
              XYZ Token = {amountUSD} USD
            </Grid>
            <TextField
              variant="outlined"
              helperText={this.state.helperText}
              onChange={this.handleNameChange.bind(this)}
              error={this.state.error}
              required
              id="donor_name"
              label="Your Name:"
              placeholder="Anonymous"
              style={{ width: 200 }}
            />
            <Typography>Send to vendor: {this.state.vendor_name}</Typography>
            <div align="middle">
              <Button variant="contained" color="primary" type="submit">
                Send
              </Button>
            </div>
          </div>
        </Form>
      );
    }
  }
}

export default Send;
