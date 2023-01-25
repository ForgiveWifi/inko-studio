import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

export default function Loading() {
  return(
    <Backdrop
      sx={{ color: '#fff', zIndex: 100}}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

