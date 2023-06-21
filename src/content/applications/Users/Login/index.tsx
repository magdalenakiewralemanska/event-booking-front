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
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserForLogin } from 'src/models/UserForLogin';
import { ACCESS_TOKEN } from 'src/constants/constants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { UserContext } from 'src/contexts/UserContext';

function LoginComponent() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const { userModifier } = useContext(UserContext);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    const user: UserForLogin = {
      username: username,
      password: password
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        user
      );
      const token = response.headers['jwt-token'];
      console.log('Token:', token);
      localStorage.setItem(ACCESS_TOKEN, token);
      userModifier({ ...response.data });
      toast.success('User logged successfully', {
        position: toast.POSITION.TOP_CENTER
      });
      navigate(`/user/details`);
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Wrong username or password. Please try again.');
    }
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
                        sx={{ width: '100%' }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
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
                        sx={{ width: '100%', mb: 3 }}
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
