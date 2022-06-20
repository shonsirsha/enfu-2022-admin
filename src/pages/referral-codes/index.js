import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { parseCookies } from '../../../utils/cookies'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import Magnify from 'mdi-material-ui/Magnify'

import TableReferralCodes from 'src/views/tables/TableReferralCodes'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import whitespace from '../../../utils/whitespace'

const ReferralCodes = ({ referralCodes, token }) => {
  const [filteredReferralCodes, setFilteredReferralCodes] = useState(referralCodes)
  const [keyword, setKeyword] = useState('')
  const [refCode, setRefCode] = useState('')
  const [priceIDR, setPriceIDR] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async () => {
    if (!disabled) {
      setLoading(true)

      const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/referral-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ code: refCode, priceIDR })
      })

      if (res.ok) {
        router.reload()
      } else {
        if (res.status === 409) {
          alert('Referral code ini telah dibuat. Mohon refresh page ini.')
        } else {
          alert('Error! Mohon ulangi. Jika tetap terjadi, mohon hubungi Sean.')
        }
        console.log(res)
      }
    }
    setLoading(false)
  }

  const handleDelete = async id => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/referral-code/${id}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': token
      }
    })
    if (res.ok) {
      router.reload()
    } else {
      alert('Error! Mohon ulangi. Jika tetap terjadi, mohon hubungi Sean.')
      console.log(res)
    }
  }

  const handleChange = e => {
    setRefCode(e.target.value.toUpperCase().replaceAll(/\s/g, ''))
  }

  const handlePriceChange = e => {
    setPriceIDR(e.target.value)
  }

  useEffect(() => {
    if (keyword.length) {
      let filtered = referralCodes.filter(
        referralCode =>
          referralCode.priceIDR.toLowerCase().includes(keyword) || referralCode.code.toLowerCase().includes(keyword)
      )
      setFilteredReferralCodes(filtered)
    } else {
      setFilteredReferralCodes(referralCodes)
    }
  }, [keyword, setFilteredReferralCodes, referralCodes])

  useEffect(() => {
    if (whitespace(refCode) || whitespace(priceIDR)) {
      setDisabled(true)
    } else {
      if (referralCodes.findIndex(rCode => rCode.code === refCode.toUpperCase()) > -1) {
        setDisabled(true)
      } else {
        setDisabled(false)
      }
    }
  }, [refCode, referralCodes, priceIDR])

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
            <CardHeader title='Referral Codes' titleTypographyProps={{ variant: 'h6' }} />
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

          <TableReferralCodes onDelete={handleDelete} data={filteredReferralCodes} />
        </Card>

        <Card sx={{ p: 5, mt: 8, maxWidth: '500px', display: 'flex', flexDirection: 'column' }}>
          <Typography as='h4' mb={4}>
            Tambah Referral Code Baru
          </Typography>
          <TextField
            onChange={handleChange}
            id='outlined-basic'
            value={refCode}
            label='Referral Code'
            variant='outlined'
          />

          <TextField
            sx={{ mt: 5 }}
            onChange={handlePriceChange}
            id='outlined-basic'
            placeholder='Contoh: 25.000 (bukan 25000)'
            value={priceIDR}
            label='Harga'
            variant='outlined'
          />
          <Button
            disabled={disabled || loading}
            onClick={handleSubmit}
            variant='contained'
            color='success'
            sx={{ fontSize: 16, mt: 5 }}
          >
            Tambah
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/referral-code`, {
    method: 'GET',
    headers: {
      'x-auth-token': token
    }
  })

  const referralCodes = (await res.json()).result

  return {
    props: {
      referralCodes,
      token
    }
  }
}

export default ReferralCodes
