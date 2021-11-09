import React from "react";
import {useState} from 'react';
import { Switch, Route, NavLink } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTable } from 'react-table'
import AppBar from '@material-ui/core/AppBar';
import Web3 from 'web3';
import { Component } from 'react'; 
// import './App.css';
import XYZ from '../../balance/abis/XYZ.json'
import { get } from "axios";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import { Table} from '@material-ui/core';
import HomeSend from '../../balance/components/HomeSend';

function FAQNavLinks() {
  return (
    <ul>
      <li>
        <NavLink to="/faq/swimming">Swimming</NavLink>
      </li>
      <li>
        <NavLink to="/faq/waterpolo">Water Polo</NavLink>
      </li>
    </ul>
  );
}

class  FAQ extends Component {
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
    const from_transactions = await daiTokenMock.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest', filter: { from: this.state.account } })
    const to_transactions = await daiTokenMock.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest', filter: { to: this.state.account } })
    this.setState({ from_transactions: from_transactions })
    this.setState({ to_transactions: to_transactions })
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
      from_transactions: [],
      to_transactions: [],
      transactions: [],
      seen:false,
      from_or_to: "from",
    }

    this.transfer = this.transfer.bind(this)
  }

  handleChange1 =()=> {
    this.setState({
      from_or_to: "from"
    })
    this.setState({
      transactions: this.state.from_transactions
    })
  };
  handleChange2 =()=> {
    this.setState({
      from_or_to: "to"
    })
    this.setState({
      transactions: this.state.to_transactions
    })
  };
  togglePop = () => {
    this.setState({
      seen: !this.state.seen
    });
  };

  render() {
    return (
        <div>
       <CssBaseline />
       <AppBar position="static">
       <Tabs aria-label="simple tabs example" centered>
           <Tab label="From" onClick={this.handleChange1}/>
           <Tab label="To" onClick={this.handleChange2}/>
         </Tabs>
       </AppBar>
       {/* <Table columns={col} /> */}
          <div className="mainblock" id="transactionTable">
          <Paper>
              <Table aria-label="simple table">
                <TableHead>
                  <TableCell>
                  Name
                </TableCell>
                <TableCell >
                  Info
                </TableCell>
                  <TableRow>
                    <TableCell>{this.state.from_or_to==="from"?"Sender":"Receiver"}</TableCell>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell >Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                { this.state.transactions.map((tx, key) => {
                      return (
                        <TableRow key={key}>
                        <TableCell >{tx.returnValues.to}</TableCell>
                        <TableCell>{tx.id}</TableCell>
                        <TableCell>{window.web3.utils.fromWei(tx.returnValues.value.toString(), 'Ether')}</TableCell>
                      </TableRow>
                      )
                    }) }
                </TableBody>
              </Table>
            </Paper>
          </div>
          </div>
    );
  }
}

// function Table({ columns, data }) {
//   // Use the state and functions returned from useTable to build your UI
//   data = []
//   const { getTableProps, headerGroups, rows, prepareRow } = useTable({
//     columns,
//     data,
//   })
  

//   // Render the UI for your table
//   return (
//     <MaUTable {...getTableProps()}>
//       <TableHead>
//         {headerGroups.map(headerGroup => (
//           <TableRow {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map(column => (
//               <TableCell {...column.getHeaderProps()}>
//                 {column.render('Header')}
//               </TableCell>
//             ))}
//           </TableRow>
//         ))}
//       </TableHead>
//       <TableBody>
//         {rows.map((row, i) => {
//           prepareRow(row)
//           return (
//             <TableRow {...row.getRowProps()}>
//               {row.cells.map(cell => {
//                 return (
//                   <TableCell {...cell.getCellProps()}>
//                     {cell.render('Cell')}
//                   </TableCell>
//                 )
//               })}
//             </TableRow>
//           )
//         })}
//       </TableBody>
//     </MaUTable>
//   )
// }

// function FAQ() {
  // const columns =[
  //     {
  //       Header: 'Name',
  //       columns: [
  //         {
  //           Header: 'Receiver',
  //           accessor: 'receiver',
  //         },
  //       ],
  //     },
  //     {
  //       Header: 'Info',
  //       columns: [
  //         {
  //           Header: 'Transaction ID',
  //           accessor: 'id',
  //         },
  //         {
  //           Header: 'Amount',
  //           accessor: 'amount',
  //         },
  //       ],
  //     },
  //   ]

  // const [col, setCol] = useState(columns);

  // const handleChange1 = (event, newValue) => {
  //   const new_columns =  [
  //       {
  //         Header: 'Name',
  //         columns: [
  //           {
  //             Header: 'Receiver',
  //             accessor: 'receiver',
  //           },
  //         ],
  //       },
  //       {
  //         Header: 'Info',
  //         columns: [
  //           {
  //             Header: 'Transaction ID',
  //             accessor: 'id',
  //           },
  //           {
  //             Header: 'Amount',
  //             accessor: 'amount',
  //           },
  //         ],
  //       },
  //     ]
  //   setCol(new_columns)
  // };
  // const handleChange2 = (event, newValue) => {
  //   const new_columns =  [
  //     {
  //       Header: 'Name',
  //       columns: [
  //         {
  //           Header: 'Sender',
  //           accessor: 'sender',
  //         },
  //       ],
  //     },
  //     {
  //       Header: 'Info',
  //       columns: [
  //         {
  //           Header: 'Transaction ID',
  //           accessor: 'id',
  //         },
  //         {
  //           Header: 'Amount',
  //           accessor: 'amount',
  //         },
  //       ],
  //     },
  //   ]
  // setCol(new_columns)
  // };
//   // const data = React.useMemo(() => makeData(20), [])

//   return (
//     <div>
//       <CssBaseline />
//       <AppBar position="static">
//       <Tabs aria-label="simple tabs example" centered>
//           <Tab label="From" onClick={handleChange1}/>
//           <Tab label="To" onClick={handleChange2}/>
//         </Tabs>
//       </AppBar>
//       <Table columns={col} />
//     </div>
//   )
// }

export default FAQ


// export default function FAQ() {
//   return (
//     <div>
//       <h1 className="Header">FAQ</h1>
//       <FAQNavLinks />
//       <Switch>
//         <Route path="/faq/swimming" component={() => <div>Swimming</div>} />
//         <Route path="/faq/waterpolo" component={() => <div>Water Polo</div>} />
//       </Switch>
//     </div>
//   );
// }
