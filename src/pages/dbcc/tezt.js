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

const SharingSession = ({ posts, token }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {/* {token}
        <br />
        {process.env.NEXT_PUBLIC_REST_API_URL}
        <br />

        <br />
        {process.env.NEXT_PUBLIC_REST_API_DOMAIN} */}

        <button
          onClick={async () => {
            const x = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/config`)
            if (x.ok) {
              const result = await x.json()
              console.log(result)
            } else {
              console.log()
              console.log('NOT OK')
            }
          }}
        >
          fetch without token
        </button>

        <button
          onClick={async () => {
            const x = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/subscribers`, {
              method: 'GET',
              headers: {
                'x-auth-token': token
              }
            })
            if (x.ok) {
              const result = await x.json()
              console.log(result)
            } else {
              console.log('NOT OK')
            }
          }}
        >
          fetch WITH token
        </button>
        <>
          {posts.map(x => (
            <>
              {x.email} <br />
            </>
          ))}
        </>
      </Grid>
    </Grid>
  )
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx.req)

  const res = await fetch(`${process.env.NEXT_PUBLIC_DUMMY_REST_API}/subscribers`, {
    method: 'GET',
    headers: {
      'x-auth-token': token
    }
  })
  let posts = (await res.json()).result

  return {
    props: {
      token,
      posts
    }
  }
}

export default SharingSession
