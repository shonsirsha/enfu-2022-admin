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

import TableDBCC from 'src/views/tables/TableDBCC'

const SharingSession = ({ registrees }) => {
  const [filteredRegistrees, setFilteredRegistrees] = useState(registrees)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (keyword.length) {
      let filtered = registrees.filter(
        registree =>
          registree.teamName.toLowerCase().includes(keyword) ||
          registree.fullName1.toLowerCase().includes(keyword) ||
          registree.fullName2.toLowerCase().includes(keyword) ||
          registree.fullName3.toLowerCase().includes(keyword) ||
          registree.email1.toLowerCase().includes(keyword) ||
          registree.teamId.toString().toLowerCase().includes(keyword) ||
          registree.univName1.toLowerCase().toString().includes(keyword) ||
          registree.phoneNr1.toString().toLowerCase().includes(keyword) ||
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
            <CardHeader title='DBCC' titleTypographyProps={{ variant: 'h6' }} />
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

          <TableDBCC data={filteredRegistrees} />
        </Card>
      </Grid>
    </Grid>
  )
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx.req)

  const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/dbcc`, {
    method: 'GET',
    headers: {
      'x-auth-token': token
    }
  })

  let registrees = (await res.json()).result
  registrees = registrees.map(registree => ({
    teamId: registree.teamId,
    teamName: registree.teamName,
    fullName1: registree.fullName1,
    univName1: registree.univName1,
    email1: registree.email1,
    phoneNr1: registree.phoneNr1,
    fullName2: registree.fullName2,
    fullName3: registree.fullName3,
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
