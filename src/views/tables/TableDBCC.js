// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import VerifChip from 'src/@core/components/verifchip'
import Link from 'next/link'

const columns = [
  { id: 'teamId', label: 'Team ID', minWidth: 100 },
  { id: 'teamName', label: 'Team Name', minWidth: 100 },
  { id: 'fullName1', label: 'Full Name (Leader)', minWidth: 100 },
  { id: 'univName1', label: 'University (Leader)', minWidth: 100 },
  { id: 'email1', label: 'Email (Leader)', minWidth: 100 },
  { id: 'phoneNr1', label: 'Phone Number (Leader)', minWidth: 100 },
  { id: 'fullName2', label: 'Full Name (2nd Member)', minWidth: 100 },
  { id: 'fullName3', label: 'Full Name (3rd Member)', minWidth: 100 },
  {
    id: 'verif',
    label: 'Verif Status',
    minWidth: 100
  },
  {
    id: 'time',
    label: 'Tanggal & Waktu (WIB)',
    minWidth: 100
  }
]

const TableDBCC = ({ data }) => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '600px' }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[...data]
              .reverse()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <Link key={row.id} href={`dbcc/${row.teamId}`} passHref>
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.teamId}>
                      {columns.map(column => {
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'verif' ? <VerifChip verif={value} /> : <>{value}</>}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  </Link>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableDBCC
