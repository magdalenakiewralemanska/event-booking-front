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

import { useEffect, useRef } from 'react';
import AuthenticationService from 'src/services/AuthenticationService';
import { NotifierTypes } from 'src/models/NotifierTypesEnum';
import NotificationService from 'src/services/NotoficationServcie';
import { VariantType } from 'notistack';
import { User } from 'src/models/User';
import { HeaderType } from 'src/models/HeaderTypeEnum';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function LoginComponent (){
  const authenticationService = useRef(AuthenticationService());
  const notificationService = useRef(NotificationService());
  const subscriptions = useRef([]);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<User>();

  useEffect(() => {
    if (authenticationService.current.isUserLoggedIn()) {
      navigate('/user/details');
    } else {
      navigate('/user/login');
    }
  }, []);

  const startLogin = async (user: User) => {
    try {
      const response = await authenticationService.current.login(user);

      if (response.status === 200) {
        const token = response.headers[HeaderType.TOKEN];
        authenticationService.current.saveToken(token);
        authenticationService.current.addUserToCache(response.parsedBody);
        navigate('/event/offers');
      } else {
        sendErrorNotification(NotifierTypes.ERROR, response.data.message);
      }
    } catch (error) {
      sendErrorNotification(NotifierTypes.ERROR, error.response.data.message);
    }
  };

  const sendErrorNotification = (noteType: VariantType, message: string) => {
    if (message) {
      notificationService.current.notify(noteType, message);
    } else {
      notificationService.current.notify(
        noteType,
        'Something went wrong, try again.'
      );
    }
  };

  useEffect(() => {
    return () => {
      subscriptions.current.forEach((subscription) =>
        subscription.unsubscribe()
      );
    };
  }, []);

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
            <form id="loginForm" onSubmit={handleSubmit(startLogin)}>
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
                        id="outlined-required"
                        label="Required"
                        {...register('username', { required: true })}
                        sx={{ minWidth: 400 }}
                      />
                      {errors.username && (
                        <span style={{ color: 'red' }}>
                          Please enter your username
                        </span>
                      )}
                    </Box>
                    <Box p={1}>
                      <Typography variant="h4" sx={{ pb: 2 }}>
                        Password
                      </Typography>
                      <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        type="password"
                        {...register('password', { required: true })}
                        sx={{ minWidth: 400 }}
                      />
                      {errors.password && (
                        <span style={{ color: 'red' }}>
                          Please enter your password
                        </span>
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
