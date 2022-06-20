import React from 'react'
import Chip from '@mui/material/Chip'

const VerifChip = ({ verif }) => {
  let color = {
    Waiting: 'warning',
    Terminated: 'error',
    Verified: 'success'
  }

  return (
    <div>
      <Chip label={verif} sx={{ fontSize: 15, mt: 4 }} color={color[verif]} />
    </div>
  )
}

export default VerifChip
