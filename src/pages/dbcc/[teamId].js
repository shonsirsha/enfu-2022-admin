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
  console.log(registree)

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
              DBCC
            </Typography>
            <Typography variant='h5' sx={{ my: 4 }}>
              Team name: <b>{registree.teamName}</b>
            </Typography>
            <Typography variant='h5' sx={{}}>
              Team ID: <b>{registree.teamId}</b>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={4}>
                <Card variant='outlined' sx={{ p: 4, my: 10 }}>
                  <Typography sx={{ fontSize: 18 }} color='text.secondary' gutterBottom>
                    Team Leader's Information
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Name : <b>{registree.fullName1}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Place, Date of Birth: <b>{registree.placeDob1}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Gender: <b>{registree.gender1.toUpperCase()}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Email: <b>{registree.email1}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Phone Number: <b>{registree.phoneNr1}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    LINE ID: <b>{registree.lineId1}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    University / Institute: <b>{registree.univName1}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Faculty / Department / Batch: <b>{registree.facultyDepartmentBatch1}</b>
                  </Typography>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ mt: 6, mb: 4, fontSize: 18 }}>
                      Foto 3x4:
                    </Typography>

                    {registree['3x4_1URL'].length ? (
                      <img
                        width={'100%'}
                        style={{ maxWidth: 400 }}
                        height={'auto'}
                        src={imageURLCreator(registree['3x4_1URL'])}
                        alt='Image'
                      />
                    ) : (
                      <b>Not Uploaded</b>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ mt: 6, mb: 4, fontSize: 18 }}>
                      Foto Student ID:
                    </Typography>

                    {registree['student_id_1URL'].length ? (
                      <img
                        width={'100%'}
                        style={{ maxWidth: 400 }}
                        height={'auto'}
                        src={imageURLCreator(registree['student_id_1URL'])}
                        alt='Image'
                      />
                    ) : (
                      <b>Not Uploaded</b>
                    )}
                  </div>
                </Card>
              </Grid>

              <Grid item xs={12} md={12} lg={4}>
                <Card variant='outlined' sx={{ p: 4, my: 10, mx: 6 }}>
                  <Typography sx={{ fontSize: 18 }} color='text.secondary' gutterBottom>
                    2<sup>nd</sup> Member's Information
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Name : <b>{registree.fullName2}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Place, Date of Birth: <b>{registree.placeDob2}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Gender: <b>{registree.gender2 && registree.gender2.toUpperCase()}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Email: <b>{registree.email2}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Phone Number: <b>{registree.phoneNr2}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    LINE ID: <b>{registree.lineId2}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    University / Institute: <b>{registree.univName2}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Faculty / Department / Batch: <b>{registree.facultyDepartmentBatch2}</b>
                  </Typography>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ mt: 6, mb: 4, fontSize: 18 }}>
                      Foto 3x4:
                    </Typography>

                    {registree['3x4_2URL'].length ? (
                      <img
                        width={'100%'}
                        style={{ maxWidth: 400 }}
                        height={'auto'}
                        src={imageURLCreator(registree['3x4_2URL'])}
                        alt='Image'
                      />
                    ) : (
                      <b>Not Uploaded</b>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ mt: 6, mb: 4, fontSize: 18 }}>
                      Foto Student ID:
                    </Typography>

                    {registree['student_id_2URL'].length ? (
                      <img
                        width={'100%'}
                        style={{ maxWidth: 400 }}
                        height={'auto'}
                        src={imageURLCreator(registree['student_id_2URL'])}
                        alt='Image'
                      />
                    ) : (
                      <b>Not Uploaded</b>
                    )}
                  </div>
                </Card>
              </Grid>

              <Grid item xs={12} md={12} lg={4}>
                <Card variant='outlined' sx={{ p: 4, my: 10 }}>
                  <Typography sx={{ fontSize: 18 }} color='text.secondary' gutterBottom>
                    3<sup>rd</sup> Member's Information
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Name : <b>{registree.fullName3}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Place, Date of Birth: <b>{registree.placeDob3}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Gender: <b>{registree.gender3 && registree.gender3.toUpperCase()}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Email: <b>{registree.email3}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Phone Number: <b>{registree.phoneNr3}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    LINE ID: <b>{registree.lineId3}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    University / Institute: <b>{registree.univName3}</b>
                  </Typography>
                  <Typography variant='body2' sx={{ mt: 4, fontSize: 18 }}>
                    Faculty / Department / Batch: <b>{registree.facultyDepartmentBatch3}</b>
                  </Typography>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ mt: 6, mb: 4, fontSize: 18 }}>
                      Foto 3x4:
                    </Typography>

                    {registree['3x4_3URL'].length ? (
                      <img
                        width={'100%'}
                        style={{ maxWidth: 400 }}
                        height={'auto'}
                        src={imageURLCreator(registree['3x4_3URL'])}
                        alt='Image'
                      />
                    ) : (
                      <b>Not Uploaded</b>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ mt: 6, mb: 4, fontSize: 18 }}>
                      Foto Student ID:
                    </Typography>

                    {registree['student_id_3URL'].length ? (
                      <img
                        width={'100%'}
                        style={{ maxWidth: 400 }}
                        height={'auto'}
                        src={imageURLCreator(registree['student_id_3URL'])}
                        alt='Image'
                      />
                    ) : (
                      <b>Not Uploaded</b>
                    )}
                  </div>
                </Card>
              </Grid>
            </Grid>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body2' sx={{ mt: 4, mb: 4, fontSize: 18 }}>
                Bukti Transfer:{' '}
              </Typography>

              {registree.paymentReceiptImageURL.length ? (
                <img
                  width={'100%'}
                  height={'auto'}
                  style={{ maxWidth: 400 }}
                  src={imageURLCreator(registree.paymentReceiptImageURL)}
                  alt='Image'
                />
              ) : (
                <b>Not Uploaded</b>
              )}
            </div>
            {registree.verif === 0 && <VerifyTerminateButtons id={registree.teamId} eventName={'dbcc'} token={token} />}
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx.req)
  const { teamId } = ctx.query

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/dbcc/${teamId}`, {
    method: 'GET',
    headers: {
      'x-auth-token': token
    }
  })

  let registree = (await res.json()).result[0]

  const resImages = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/dbcc/images/${teamId}`, {
    method: 'GET',
    headers: {
      'x-auth-token': token
    }
  })

  let images = (await resImages.json()).result[0]

  delete images.id
  delete images.teamId

  registree = { ...registree, ...images }

  return {
    props: {
      registree,
      token
    }
  }
}

export default CoachingClinic
