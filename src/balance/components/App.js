import React, { Component } from 'react';
import daiLogo from '../dai-logo.png';
import './App.css';
import Web3 from 'web3';
import XYZ from '../abis/XYZ.json'
import { get } from "axios";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import { Table , TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import HomeSend from './HomeSend';

class Home extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() { 
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const XYZAddress = "0x8b0070828f11247Ed1f479927df558a199342239" // Replace DAI Address Here
    const daiTokenMock = new web3.eth.Contract(XYZ.abi, XYZAddress)

    this.setState({ daiTokenMock: daiTokenMock })
    const balance = await daiTokenMock.methods.balanceOf(this.state.account).call()

    this.setState({ balance: web3.utils.fromWei(balance.toString(), 'Ether') })
    const transactions = await daiTokenMock.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest', filter: { from: this.state.account } })
    this.setState({ transactions: transactions })
    console.log(transactions);
    console.log(web3.utils.fromWei(balance.toString(), 'Ether'));
  }

  transfer(recipient, amount) {
    this.state.daiTokenMock.methods.transfer(recipient, amount).send({ from: this.state.account })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      daiTokenMock: null,
      balance: 0,
      transactions: [],
      seen:false
    }

    this.transfer = this.transfer.bind(this)
  }

  togglePop = () => {
    this.setState({
      seen: !this.state.seen
    });
  };

  render() {
    return (
      <div>
          <div><Typography variant="h6" id="tableTitle" component="div">Home</Typography> </div>
          <div className="mainblockContain">
          <div className="mainblock" id="balance">
            <Card id="balanceCard">
              <CardContent>
              <p className="darkp">Balance</p>
              <div className="cardMain">
                <div className="cardContent">
                  <p className="cardHead">DAI Balance</p>
                  <p gutterBottom className="darkp" style={{fontSize:"3.0rem"}}>
                  {this.state.balance} DAI
                  </p>
                </div>
                <div className="cardContent">
                  <p className="cardHead">USD Value</p>
                  <p gutterBottom className="darkp">
                  $XXX
                  </p>
                </div>
              </div>
              </CardContent>
            </Card>
            
            <HomeSend className="homesend"/>
          </div>
          <div className="mainblock" id="transactionTable">
          <div className="transactionMain">
          <p className="darkp" style={{fontSize:"2.0rem"}}>Transaction History</p>
            <div className="transactionContent" style={{borderRadius:"15px"}}>
              <Table stickyHeader aria-label="sticky table">
                  <TableHead >
                    <TableRow >
                      <TableCell align="left" style={{fontSize:"16px"}}>Recipient Address</TableCell>
                      <TableCell align="left" style={{fontSize:"16px"}}>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { this.state.transactions.map((tx, key) => {
                        return (
                          <TableRow key={key}>
                          <TableCell align="left" style={{fontSize:"15px"}}>{tx.returnValues.to}</TableCell>
                          <TableCell align="left" style={{fontSize:"15px"}}>{window.web3.utils.fromWei(tx.returnValues.value.toString(), 'Ether')}</TableCell>
                        </TableRow>
                        )
                      }) }
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          </div>
      </div>
    );
  }
}

export default Home;
