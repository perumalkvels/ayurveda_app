import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Image } from '@mui/icons-material';


const defaultTheme = createTheme();
export default function AuthGirdContainer() {

return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ display: 'flex', height: '75vh', backgroundImage: 'linear-gradient(to right bottom, #430089, #82ffa1)', }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
            <Typography component="h1" variant="h4">
              Welcome to Akaram ! 
            </Typography>
        </Grid>
          
       
       <Outlet /> 
      </Grid>
     
    </ThemeProvider>
  );
}