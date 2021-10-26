import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { useTable } from 'react-table'

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



function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  data = []
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}

function FAQ() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'Sender',
            accessor: 'sender',
          },
          {
            Header: 'Receiver',
            accessor: 'receiver',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Transaction ID',
            accessor: 'id',
          },
          {
            Header: 'Amount',
            accessor: 'amount',
          },
          {
            Header: 'Fee',
            accessor: 'fee',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
        ],
      },
    ],
    []
  )

  // const data = React.useMemo(() => makeData(20), [])

  return (
    <div>
      <CssBaseline />
      <Table columns={columns} />
    </div>
  )
}

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
