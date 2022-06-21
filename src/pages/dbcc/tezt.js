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

const SharingSession = ({ token }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {token}
        <br />
        {process.env.NEXT_PUBLIC_REST_API_URL}
        <br />
        {process.env.NEXT_PUBLIC_REST_API_DOMAIN}
      </Grid>
    </Grid>
  )
}

export async function getServerSideProps(ctx) {
  // const { token } = parseCookies(ctx.req)

  return {
    props: {
      token: 'asd'
    }
  }
}

export default SharingSession
