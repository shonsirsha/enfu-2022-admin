// ** React Imports
import { useState } from 'react'
import Link from 'next/link'

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

const columns = [
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'fullName', label: 'Full Name', minWidth: 100 },
  { id: 'facultyDepartmentBatch', label: 'Fac / Dep / Batch', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'univName', label: 'University / Institute', minWidth: 100 },
  { id: 'phoneNr', label: 'Phone', minWidth: 100 },
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

const TableSharingSession = ({ data }) => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)

  const handleChangePage = (_, newPage) => {
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
                  <Link key={row.id} passHref href={`/sharing-session/${row.id}`}>
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
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

export default TableSharingSession
