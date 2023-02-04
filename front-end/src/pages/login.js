import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
// import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';



const theme = createTheme();

export default function SignInSide() {


  const [data, setData] = useState({  username: "", password:"" })
  const navigate = useNavigate();

  // handle submision
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append("user_name", data.username)
    formData.append("password", data.password)

    console.log(formData)

    axios.post('http://localhost:4000/login', formData, {
      headers: {
        "Content-Type": "application/json",
      }
    }
   )
    .then((response)=> {
      if(response.status === 200 && response.data.user.role === 2)
      {
        localStorage.setItem('token', response.data.user.accessToken)
        // setAuth(response.data.user);
        // toast.success('Login successifully')
        navigate("/books")
        console.log(response)
      }
      if(response.status === 200 && response.data.user.role === 1){
        localStorage.setItem('token', response.data.user.accessToken)
        // toast.success('Login successifully')
        // setAuth(response.data.user);
        navigate("/user_dashboard")
        console.log(response.data.user.accessToken)
      }
    
    })
    .catch((e)=> {
      
      // toast.error('error')
      console.log(e)
   
    })

  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="text"
                autoFocus
                value={data.username}
                onChange={e => setData({...data, username: e.target.value})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={data.password}
                onChange={e => setData({...data, password: e.target.value})}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}