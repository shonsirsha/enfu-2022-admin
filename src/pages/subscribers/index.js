import { useState, useEffect } from 'react'
import formatDate from '../../../utils/formatDate'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import Magnify from 'mdi-material-ui/Magnify'

import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const Subscribers = ({ subscribers }) => {
  const [filteredSubscribers, setFilteredSubscribers] = useState(subscribers)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (keyword.length) {
      let filtered = subscribers.filter(
        subscriber =>
          subscriber.email.toLowerCase().includes(keyword) ||
          subscriber.id.toString().includes(keyword) ||
          subscriber.time.toString().toLowerCase().includes(keyword)
      )
      setFilteredSubscribers(filtered)
    } else {
      setFilteredSubscribers(subscribers)
    }
  }, [keyword, setFilteredSubscribers, subscribers])

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
            <CardHeader title='Subscribers' titleTypographyProps={{ variant: 'h6' }} />
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

          <TableStickyHeader data={filteredSubscribers} />
        </Card>
      </Grid>
    </Grid>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/subscribers`)
  let subscribers = (await res.json()).result
  subscribers = subscribers.map(subscriber => ({ ...subscriber, time: formatDate(parseInt(subscriber.time)) }))

  return {
    props: {
      subscribers
    },
    revalidate: 1
  }
}

export default Subscribers
