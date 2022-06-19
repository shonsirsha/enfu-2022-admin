// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const Subscribers = ({ subscribers }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Subscribers' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader data={subscribers} />
        </Card>
      </Grid>
    </Grid>
  )
}

export async function getStaticProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`)
  const subscribers = await res.json()

  return {
    props: {
      subscribers: subscribers
    },
    revalidate: 1
  }
}

export default Subscribers
