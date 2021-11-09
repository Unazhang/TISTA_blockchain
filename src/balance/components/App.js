import React, { Component } from 'react';
import daiLogo from '../dai-logo.png';
import './App.css';
import Web3 from 'web3';
import XYZ from '../abis/XYZ.json'
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
          <div>
          <div className="mainblock" id="balanceCard">
            <Card>
              <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">balance</Typography>
              <div>
                <Typography variant="body2" color="textSecondary" component="p">DAI Balance</Typography>
                <Typography gutterBottom variant="h5" component="h2">
                {this.state.balance} DAI
                </Typography>
              </div>
              <div>
                <Typography variant="body2" color="textSecondary" component="p">USD Value</Typography>
                <Typography gutterBottom variant="h5" component="h2">
                $XXX
                </Typography>
              </div>
              </CardContent>
            </Card>
            
            <HomeSend/>
          </div>
          <div className="mainblock" id="transactionTable">
          <Paper>
              <Table aria-label="simple table">
                <TableHead>
                <Typography variant="h6" id="tableTitle" component="div">Transaction History</Typography>
                  <TableRow>
                    <TableCell align="right">Recipient Address</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { this.state.transactions.map((tx, key) => {
                      return (
                        <TableRow key={key}>
                        <TableCell align="right">{tx.returnValues.to}</TableCell>
                        <TableCell align="right">{window.web3.utils.fromWei(tx.returnValues.value.toString(), 'Ether')}</TableCell>
                      </TableRow>
                      )
                    }) }
                </TableBody>
              </Table>
            </Paper>
          </div>
          </div>
      </div>
    );
  }
}

export default Home;
