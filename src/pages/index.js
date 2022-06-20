import Grid from '@mui/material/Grid'

const Dashboard = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6} lg={4}></Grid>
    </Grid>
  )
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/dbcc',
      permanent: false
    }
  }
}

export default Dashboard
