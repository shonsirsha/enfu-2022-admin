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

const CoachingSession = ({ registree, token }) => {
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
              Coaching Session
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              ID: <b>{registree.id}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              Name: <b>{registree.fullName}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              Place, Date of Birth: <b>{registree.placeDOB}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              Email: <b>{registree.email}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              Phone Number: <b>{registree.phoneNr}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              LINE ID: <b>{registree.lineId}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              Faculty / Department / Batch: <b>{registree.facultyDepartmentBatch}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              University / Institute: <b>{registree.univName}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              Gender: <b>{registree.gender.toUpperCase()}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              DBCC Participant: <b>{parseInt(registree.dbccParticipant) === 1 ? 'Yes' : 'No'}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              DBCC Team Name: <b>{registree.dbccTeamName}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              DBCC Registration Code: <b>{registree.dbccCodeOfRegistration}</b>
            </Typography>
            <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
              Waktu Pendaftaran: <b>{formatDate(parseInt(registree.time))} WIB</b>
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
            {registree.verif === 0 && <VerifyTerminateButtons id={registree.id} eventName={'cs'} token={token} />}
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/coaching-session/${id}`, {
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

export default CoachingSession
