import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const loaderStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999, // Set a high z-index to ensure it's on top
};

export default function PageLoader() {
  return (
    <Box sx={loaderStyle}>
      <CircularProgress color="primary" />
    </Box>
  );
}