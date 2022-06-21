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
  // const { token } = parseCookies(ctx.req)

  const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/dbcc`, {
    method: 'GET',
    headers: {
      'x-auth-token':
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY5MGZiMWFlMDQ4YTU0OGZiNjgxYWQ2MDkyYjBiODY5ZWE0NjdhYzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZW5mdTIwMjIiLCJhdWQiOiJlbmZ1MjAyMiIsImF1dGhfdGltZSI6MTY1NTc1NzY3NCwidXNlcl9pZCI6IlV0dDgyVlozdFloeHgzMzFwVTJZM2MySGR6RTMiLCJzdWIiOiJVdHQ4MlZaM3RZaHh4MzMxcFUyWTNjMkhkekUzIiwiaWF0IjoxNjU1NzcyMjI3LCJleHAiOjE2NTU3NzU4MjcsImVtYWlsIjoiYWRtaW5AZW5mdXRpb24uY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFkbWluQGVuZnV0aW9uLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.ZfBHVNBINyg3wqEFI22xqTTOaUUB1iLCTtBBg_DGTU7czIcGhq9zpK6W61TkEJD5y7y_2qJXMu_J-ymluH2UJ0Yz_SQGcodLzhgShy_o2HgzjRDw8VPK6QvLEqi5yPl1L-iMSfQjoG1NiFh6hUQcBdmU_L7rZI1pocZMJ2bnZ41jQx8chqo0hhO32O1mW2vD-u_hMpMWPziykNMRy5-As_hCMsBjbN2Gge1R2Bt4bx12F2OLpuuN36Qkoma_tCdE3Aa2HOf8J2Nj2Ocq-Q6kz1BubrmvKh5I5TbIsVdt2EzSi7TxCyf3EDN8-oh80-894luaLvraZY_NPWziPH4zVg'
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
