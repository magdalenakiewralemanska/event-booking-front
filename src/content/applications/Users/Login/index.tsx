import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  TextField,
  Container
} from '@mui/material';

import { Helmet } from 'react-helmet-async';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import axios from 'axios';
import { UserForLogin } from 'src/models/UserForLogin';

function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (!username || !password) {
      setErrorMessage('Please enter both username and password');
      return;
    }
    const user: UserForLogin = {
      username: username,
      password: password
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/user/login`, user)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setErrorMessage('Login failed. Please try again.');
      });
  };

  return (
    <>
      <Helmet>
        <title>Tooltips - Components</title>
      </Helmet>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          p={3}
        >
          <Grid item xs={6}>
            <form id="loginForm" onSubmit={handleFormSubmit}>
              <Card>
                <Box
                  p={3}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h3" gutterBottom>
                      Log into your account
                    </Typography>
                  </Box>
                  <Button variant="text" type="submit" form="loginForm">
                    <LockIcon sx={{ mr: 1 }} />
                    Log in
                  </Button>
                </Box>
                <Divider />
                <CardContent sx={{ p: 4 }}>
                  <Box px={3} pb={2}>
                    <Box p={1}>
                      <Typography variant="h4" sx={{ pb: 2 }}>
                        Username
                      </Typography>
                      <TextField
                        required
                        id="username"
                        label="Required"
                        sx={{ minWidth: 400 }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      {errorMessage && (
                        <span style={{ color: 'red' }}>{errorMessage}</span>
                      )}
                    </Box>
                    <Box p={1}>
                      <Typography variant="h4" sx={{ pb: 2 }}>
                        Password
                      </Typography>
                      <TextField
                        required
                        id="password"
                        label="Required"
                        type="password"
                        sx={{ minWidth: 400 }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errorMessage && (
                        <span style={{ color: 'red' }}>{errorMessage}</span>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default LoginComponent;
