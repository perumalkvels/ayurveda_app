import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { useSelector, useDispatch } from 'react-redux';
import { registerUser,setIsRegistered,setRegisterData} from '../../Redux/Slices/userAuthSlice';
import {auth, database} from '../../Firebase/firebaseConfig';
import { getDatabase, ref, set } from "firebase/database";
const defaultTheme = createTheme();

export default function SignUp() {

  // Store Data to Firebase - Realtime DataBase

  // function writeUserData() {
  //   const db = getDatabase();
  //   set(ref(db, 'usersDetails/' + 1), {
  //     username: 'name',
  //     email: 'email',
  //     profile_picture : 'imageUrl'
  //   });
  //   console.log('success'); 
  // }

  // writeUserData();

  const dispatch = useDispatch();
  // const { isRegistered,registerData} = useSelector((state) => state.authData);

  const navigate = useNavigate();
  const handleSubmit = event => {
    event.preventDefault();
    const formData = {};
  
    // Iterate through the form element
    for (const element of event.target.elements) {
      if (element.tagName === 'INPUT') {
        if (element.name.trim() !== '') {
          formData[element.name] = element.value;
        }
      }
    }

   dispatch(registerUser(formData));
  };

  return (
    <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square
    sx={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      px: '100px',
      backgroundColor: 'white',
    }}>

          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  // onChange={(e) => updateRegisterData(e.target.name,e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  name="mobile"
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile No"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  variant="body2"
                  control={<Checkbox size="small" value="allowExtraEmails" color="primary" />}
                  label={<Typography variant="body2" color="textSecondary" required>I Agree With Terms & Condition</Typography>}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2"
                onClick={() => {
                    navigate('/auth/login')
                  }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        {/* </Box> */}
    </Grid>
  );
}