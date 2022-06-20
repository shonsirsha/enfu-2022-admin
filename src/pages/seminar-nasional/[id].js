import formatDate from '../../../utils/formatDate'
import { parseCookies } from '../../../utils/cookies'
import imageURLCreator from '../../../utils/imageURLCreator'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import VerifyTerminateButtons from 'src/@core/components/VerifyTerminateButtons'

const CoachingClinic = ({ registree, token }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'start',
              justifyContent: 'space-between',
              flexDirection: 'column',
              padding: 5
            }}
          >
            {registree.verif === 0 && <Chip label='Waiting' sx={{ fontSize: 21, mb: 4 }} color='warning' />}
            {registree.verif === 1 && <Chip label='Verified' sx={{ fontSize: 21, mb: 4 }} color='success' />}{' '}
            {registree.verif === -1 && <Chip label='Terminated' sx={{ fontSize: 21, mb: 4 }} color='error' />}
            <Typography variant='h5' component='div'>
              Seminar Nasional
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              ID: <b>{registree.id}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              Name: <b>{registree.fullName}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              Date of Birth: <b>{registree.dob}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              Email: <b>{registree.email}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              Phone Number: <b>{registree.phoneNr}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              Status: <b>{registree.status}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              University / Institute: <b>{registree.univName}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              Faculty / Department / Batch: <b>{registree.facultyDepartmentBatch}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              Referral Code: <b>{registree.referralCode}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              Waktu Pendaftaran: <b>{formatDate(parseInt(registree.time))} WIB</b>
            </Typography>
            {/* <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              Paper:{' '}
              {registree.paperDocumentURL.length ? (
                <iframe
                  src={imageURLCreator(registree.paperDocumentURL)}
                  height='600px'
                  width='1320px'
                  style={{ maxWidth: '100%' }}
                ></iframe>
              ) : (
                <b>Not Uploaded</b>
              )}
            </Typography> */}
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              KTM:{' '}
              {registree.ktmImageURL.length ? (
                <img width={'100%'} height={'auto'} src={imageURLCreator(registree.ktmImageURL)} alt='Image' />
              ) : (
                <b>Not Uploaded</b>
              )}
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              Bukti Transfer:{' '}
              {registree.paymentReceiptImageURL.length ? (
                <img
                  width={'100%'}
                  height={'auto'}
                  src={imageURLCreator(registree.paymentReceiptImageURL)}
                  alt='Image'
                />
              ) : (
                <b>Not Uploaded</b>
              )}
            </Typography>
            {registree.verif === 0 && <VerifyTerminateButtons id={registree.id} eventName={'semnas'} token={token} />}
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx.req)
  const { id } = ctx.query

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/seminar-nasional/${id}`, {
    method: 'GET',
    headers: {
      'x-auth-token': token
    }
  })

  let registree = (await res.json()).result[0]

  return {
    props: {
      registree,
      token
    }
  }
}

export default CoachingClinic
