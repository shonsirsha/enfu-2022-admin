import { useState } from 'react'
import { parseCookies } from '../../../utils/cookies'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'

import Button from '@mui/material/Button'

const Registrations = ({ config, token }) => {
  const [disabled, setDisabled] = useState(false)
  const [configState, setConfigState] = useState(config)

  const handleSubmit = async () => {
    setDisabled(true)

    const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/config`, {
      method: 'PUT',
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        regist_dbcc_open: configState.regist_dbcc_open,
        regist_coaching_clinic_open: configState.regist_coaching_clinic_open,
        regist_coaching_session_open: configState.regist_coaching_session_open,
        regist_semnas_open: configState.regist_semnas_open,
        regist_sharing_session_open: configState.regist_sharing_session_open
      })
    })

    if (res.ok) {
      console.log('Successful')
    } else {
      alert('Error! Mohon ulangi. Jika tetap terjadi, mohon hubungi Sean.')
      console.log(res)
    }
    setDisabled(false)
  }

  const handleChange = (e, eventName) => {
    setConfigState({ ...configState, [eventName]: e.target.value })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', p: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Card sx={{ p: 5, m: 8, width: '420px', display: 'flex', flexDirection: 'column' }}>
            <FormControl fullWidth>
              <InputLabel>Coaching Clinic</InputLabel>
              <Select
                value={configState.regist_coaching_clinic_open}
                onChange={e => {
                  handleChange(e, 'regist_coaching_clinic_open')
                }}
              >
                <MenuItem value={1}>Open</MenuItem>
                <MenuItem value={0}>Close</MenuItem>
              </Select>
            </FormControl>
          </Card>

          <Card sx={{ p: 5, m: 8, width: '420px', display: 'flex', flexDirection: 'column' }}>
            <FormControl fullWidth>
              <InputLabel>Coaching Session</InputLabel>
              <Select
                value={configState.regist_coaching_session_open}
                onChange={e => {
                  handleChange(e, 'regist_coaching_session_open')
                }}
              >
                <MenuItem value={1}>Open</MenuItem>
                <MenuItem value={0}>Close</MenuItem>
              </Select>
            </FormControl>
          </Card>

          <Card sx={{ p: 5, m: 8, width: '420px', display: 'flex', flexDirection: 'column' }}>
            <FormControl fullWidth>
              <InputLabel>DBCC</InputLabel>
              <Select
                value={configState.regist_dbcc_open}
                onChange={e => {
                  handleChange(e, 'regist_dbcc_open')
                }}
              >
                <MenuItem value={1}>Open</MenuItem>
                <MenuItem value={0}>Close</MenuItem>
              </Select>
            </FormControl>
          </Card>

          <Card sx={{ p: 5, m: 8, width: '420px', display: 'flex', flexDirection: 'column' }}>
            <FormControl fullWidth>
              <InputLabel>Sharing Session</InputLabel>
              <Select
                value={configState.regist_sharing_session_open}
                onChange={e => {
                  handleChange(e, 'regist_sharing_session_open')
                }}
              >
                <MenuItem value={1}>Open</MenuItem>
                <MenuItem value={0}>Close</MenuItem>
              </Select>
            </FormControl>
          </Card>

          <Card sx={{ p: 5, m: 8, width: '420px', display: 'flex', flexDirection: 'column' }}>
            <FormControl fullWidth>
              <InputLabel>Seminar Nasional</InputLabel>
              <Select
                value={configState.regist_semnas_open}
                onChange={e => {
                  handleChange(e, 'regist_semnas_open')
                }}
              >
                <MenuItem value={1}>Open</MenuItem>
                <MenuItem value={0}>Close</MenuItem>
              </Select>
            </FormControl>
          </Card>
        </Box>

        <Card sx={{ p: 5, m: 8, maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
          <Button disabled={disabled} onClick={handleSubmit} variant='contained' color='success' sx={{ fontSize: 16 }}>
            Simpan
          </Button>
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/config`, {
    method: 'GET',
    headers: {
      'x-auth-token': token
    }
  })

  const config = (await res.json()).result[0]

  return {
    props: {
      config,
      token
    }
  }
}

export default Registrations
