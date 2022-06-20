import { useState, useEffect } from 'react'
import formatDate from '../../../utils/formatDate'
import { parseCookies } from '../../../utils/cookies'
import verifText from '../../../utils/verifText'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import Magnify from 'mdi-material-ui/Magnify'

import TableCoachingSession from 'src/views/tables/TableCoachingSession'

const SharingSession = ({ registrees }) => {
  const [filteredRegistrees, setFilteredRegistrees] = useState(registrees)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (keyword.length) {
      let filtered = registrees.filter(
        registree =>
          registree.email.toLowerCase().includes(keyword) ||
          registree.id.toString().includes(keyword) ||
          registree.univName.toLowerCase().toString().includes(keyword) ||
          registree.facultyDepartmentBatch.toLowerCase().toString().includes(keyword) ||
          registree.phoneNr.toString().toLowerCase().includes(keyword) ||
          registree.verif.toString().toLowerCase().includes(keyword) ||
          registree.time.toString().toLowerCase().includes(keyword)
      )
      setFilteredRegistrees(filtered)
    } else {
      setFilteredRegistrees(registrees)
    }
  }, [keyword, setFilteredRegistrees, registrees])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: 4
            }}
          >
            <CardHeader title='Coaching Clinic' titleTypographyProps={{ variant: 'h6' }} />
            <TextField
              onChange={e => {
                const text = e.target.value.toLowerCase()
                setKeyword(text)
              }}
              size='small'
              placeholder='Cari...'
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Magnify fontSize='small' />
                  </InputAdornment>
                )
              }}
            />
          </Box>

          <TableCoachingSession data={filteredRegistrees} />
        </Card>
      </Grid>
    </Grid>
  )
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx.req)

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/coaching-clinic`, {
    method: 'GET',
    headers: {
      'x-auth-token': token
    }
  })

  let registrees = (await res.json()).result
  registrees = registrees.map(registree => ({
    id: registree.id,
    fullName: registree.fullName,
    facultyDepartmentBatch: registree.facultyDepartmentBatch,
    email: registree.email,
    univName: registree.univName,
    phoneNr: registree.phoneNr,
    verif: verifText(registree.verif),
    time: formatDate(parseInt(registree.time))
  }))

  return {
    props: {
      registrees
    }
  }
}

export default SharingSession
