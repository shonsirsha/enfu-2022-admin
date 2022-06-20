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

import TrashCan from 'mdi-material-ui/TrashCan'
import { Button } from '@mui/material'

const columns = [
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'code', label: 'Code', minWidth: 100 },
  {
    id: 'priceIDR',
    label: 'Price',
    minWidth: 100
  },
  {
    id: 'delete',
    label: 'Hapus',
    minWidth: 100
  }
]

const TableReferralCodes = ({ data, onDelete }) => {
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
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                    {columns.map(column => {
                      const value = row[column.id]

                      return (
                        <>
                          {column.id === 'delete' ? (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                onClick={() => {
                                  onDelete(row.id)
                                }}
                                variant='contained'
                                color='error'
                              >
                                <TrashCan sx={{ color: '#fff' }} />
                              </Button>
                            </TableCell>
                          ) : (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          )}
                        </>
                      )
                    })}
                  </TableRow>
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

export default TableReferralCodes
