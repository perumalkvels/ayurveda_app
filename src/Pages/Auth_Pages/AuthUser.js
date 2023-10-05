import React,{useEffect, useState, useRef} from 'react';
import { Box, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import PageLoader from '../../Components/PageLoader';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import { Outlet } from 'react-router-dom';

import { Image } from '@mui/icons-material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const AuthUser = () => {

  return (
    <>
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        // marginBottom: '100px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          // height: '30%',
          // backgroundImage: 'linear-gradient(to right bottom, #430089, #82ffa1)',
        }}
      >
      </Box>
      <Box
        sx={{
          width: '100%',
        }}
       >
      <Grid container component="main" sx={{ display: 'flex', height: '100vh', backgroundImage: 'linear-gradient(to right bottom, #430089, #82ffa1)', }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
            <Typography component="h1" variant="h4">
              Welcome to ஆயுர்வேதா App ! 
            </Typography>
        <Copyright sx={{ mt: 5, position: 'absolute', bottom: '30px' }} />

        </Grid>
        
        <Outlet /> 

        </Grid>
      </Box>
    </Box>
    </>
  );
}

export default AuthUser;