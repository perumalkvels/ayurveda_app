import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {setIsLogged } from '../../Redux/Slices/userDataSlice';
import {loginUser} from '../../Redux/Slices/userAuthSlice';


export default function Login() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.userData.isLogged);
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

    dispatch(loginUser(formData));
    console.log('handle submit called from login Page');
    // dispatch(setIsLogged(true));
    // navigate('/home');
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox size="small"  value="remember" color="primary" />}
                label={<Typography variant="body2" color="textSecondary">Remember me</Typography>}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link variant="body2" onClick={() => {
                      navigate('/auth/register')
                    }}>
                    {"Don't have an account?"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
        </Grid>
  );
}