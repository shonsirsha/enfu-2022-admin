import React, { useState } from 'react'
import { useRouter } from 'next/router'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const VerifyTerminateButtons = ({ id, eventName, token }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleVerify = async () => {
    setLoading(true)

    const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/verif/${id}/${eventName}`, {
      method: 'PUT',
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
    setLoading(false)
  }

  const handleTerminate = async () => {
    setLoading(true)

    const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/terminate/${id}/${eventName}`, {
      method: 'PUT',
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
    setLoading(false)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'start',
        mt: 3
      }}
    >
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          {' '}
          <Button onClick={handleVerify} variant='contained' color='success' sx={{ fontSize: 16, mr: 5 }}>
            VERIFY
          </Button>
          <Button onClick={handleTerminate} variant='contained' color='error' sx={{ fontSize: 16 }}>
            TERMINATE
          </Button>
        </>
      )}
    </Box>
  )
}

export default VerifyTerminateButtons
