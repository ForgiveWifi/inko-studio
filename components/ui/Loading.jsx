import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

export default function Loading({ loading }) {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: 100 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

