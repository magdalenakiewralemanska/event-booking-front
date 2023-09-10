import {
  Box,
  CardMedia,
  Typography,
  Card,
  CardHeader,
  Divider,
  Button,
  CardActions,
  TextField,
  Grid,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { RoleEnum } from 'src/models/RoleEnum';
import { User } from 'src/models/User';

const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       padding: ${theme.spacing(3)};
  `
);

function RegistrationForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: RoleEnum.USER,
    address: {
      street: '',
      houseNumber: '',
      apartmentNumber: '',
      zipCode: '',
      city: ''
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [addressField]: value
        }
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value
      }));
    }
  };

  const validateUserDetails = (): boolean => {
    const validationErrors: Record<string, boolean> = {};
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex =
      /^(?:\+?[1-9](?:\d{1,9}\s?)?(?:\(\d{1,9}\))?(?:\s?\d{2,8}){1,5})?$/;
    const addressNumberRegex = /^(\d+[A-Za-z]?|)$/;
    const zipCodeRegex = /^$|^\d{2}-\d{3}$/;
    const nameRegex = /^[A-Z][a-zA-Z' -]*$/u;
    const usernameRegex = /^(?:[a-zA-Z0-9$%&!'*@#\s-]+)?$/u;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%-*?&]{10,}$/;

    if (
      user.firstName.length < 2 ||
      user.firstName.length > 20 ||
      !nameRegex.test(user.firstName)
    ) {
      validationErrors.firstName = true;
    }
    if (
      user.lastName.length < 2 ||
      user.lastName.length > 25 ||
      !nameRegex.test(user.lastName)
    ) {
      validationErrors.lastName = true;
    }
    if (!usernameRegex.test(user.username)) {
      validationErrors.username = true;
    }
    if (!passwordRegex.test(user.password)) {
      validationErrors.password = true;
    }
    if (!emailRegex.test(user.email)) {
      validationErrors.email = true;
    }
    if (!phoneRegex.test(user.phoneNumber)) {
      validationErrors.phoneNumber = true;
    }
    if (user.address.street.length > 25) {
      validationErrors.street = true;
    }
    if (!addressNumberRegex.test(user.address.houseNumber)) {
      validationErrors.houseNumber = true;
    }
    if (!addressNumberRegex.test(user.address.apartmentNumber)) {
      validationErrors.apartmentNumber = true;
    }
    if (!zipCodeRegex.test(user.address.zipCode)) {
      validationErrors.zipCode = true;
    }
    if (user.address.city.length > 20) {
      validationErrors.city = true;
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async () => {
    try {
      if (!validateUserDetails()) {
        return;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/registration`,
        user
      );
      if (response.status === 200) {
        toast.success('User registered successfully', {
          position: toast.POSITION.TOP_CENTER
        });
        navigate(`/user/login`);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data;
        setErrorMessage(errorMessage);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          p={3}
        >
          <Card>
            <CardHeader />
            <CardMedia
              sx={{ minHeight: 280 }}
              image="/static/images/registration.jpg"
              title="Registration"
            />
            <Box px={3} ml={3} mt={4}>
              <Typography variant="h3" sx={{ pb: 1 }}>
                Basic profile data:
              </Typography>
            </Box>
            <Box px={3} pb={2} display={'flex'} flexWrap={'wrap'}>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Username
                </Typography>
                <TextField
                  required
                  id="outlined-required"
                  label="Required"
                  name="username"
                  value={user.username}
                  error={errors.username}
                  helperText={
                    errors.username
                      ? "Username can only contain letters, numbers and special characters such as $%&!'*#@"
                      : ''
                  }
                  onChange={handleChange}
                />
                <Box>
                  {errorMessage && (
                    <Typography variant="body2" color="error">
                      {errorMessage}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Email
                </Typography>
                <TextField
                  required
                  id="outlined-required"
                  label="Required"
                  type="email"
                  name="email"
                  value={user.email}
                  error={errors.email}
                  helperText={
                    errors.email
                      ? 'Your email pattern is incorrect. Please check that all important elements like "@" or "." have been entered correctly'
                      : ''
                  }
                  onChange={handleChange}
                />
              </Box>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  First name
                </Typography>
                <TextField
                  required
                  id="outlined-required"
                  label="Required"
                  name="firstName"
                  value={user.firstName}
                  error={errors.firstName}
                  helperText={
                    errors.firstName
                      ? 'Name should have at least 2 signs but not more than 20'
                      : ''
                  }
                  onChange={handleChange}
                />
              </Box>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Last name
                </Typography>
                <TextField
                  required
                  id="outlined-required"
                  label="Required"
                  name="lastName"
                  value={user.lastName}
                  error={errors.lastName}
                  helperText={
                    errors.lastName
                      ? 'Surname should have at least 2 signs but not more than 20'
                      : ''
                  }
                  onChange={handleChange}
                />
              </Box>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Password
                </Typography>
                <TextField
                  required
                  id="outlined-required"
                  label="Required"
                  type="password"
                  name="password"
                  value={user.password}
                  error={errors.password}
                  helperText={
                    errors.password
                      ? 'The password should contain at least 10 characters, including one uppercase letter and one special character'
                      : ''
                  }
                  onChange={handleChange}
                />
              </Box>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Phone number
                </Typography>
                <TextField
                  id="outlined-helperText"
                  label=""
                  type="text"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  error={errors.phoneNumber}
                  helperText={
                    errors.phoneNumber
                      ? 'The phone number you entered is in an invalid format'
                      : ''
                  }
                  onChange={handleChange}
                />
              </Box>
            </Box>
            <Box px={3} ml={3} mt={4}>
              <Typography variant="h3" sx={{ pb: 1 }}>
                Address data:
              </Typography>
            </Box>
            <Box px={3} pb={2} display={'flex'}>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Street
                </Typography>
                <TextField
                  id="outlined-helperText"
                  label=""
                  name="address.street"
                  value={user.address.street}
                  error={errors.street}
                  helperText={
                    errors.street
                      ? 'The street name must start with a capital letter and should only contain letters, numbers or special characters such as an apostrophe or & sign'
                      : ''
                  }
                  onChange={handleChange}
                />
              </Box>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  House number
                </Typography>
                <TextField
                  id="outlined-number"
                  label="Number"
                  type="number"
                  name="address.houseNumber"
                  value={user.address.houseNumber}
                  error={errors.houseNumber}
                  helperText={
                    errors.houseNumber
                      ? 'House number should start with a number, it can contain one uppercase or lowercase letter, but there should be no more digits after the letter'
                      : ''
                  }
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Box>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Appartment number
                </Typography>
                <TextField
                  id="outlined-number"
                  label="Number"
                  type="number"
                  name="address.apartmentNumber"
                  value={user.address.apartmentNumber}
                  error={errors.apartmentNumber}
                  helperText={
                    errors.apartmentNumber
                      ? 'Apartment number should start with a number, it can contain one uppercase or lowercase letter, but there should be no more digits after the letter'
                      : ''
                  }
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Box>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Zip-code
                </Typography>
                <TextField
                  id="outlined-helperText"
                  label=""
                  type="zip-code"
                  name="address.zipCode"
                  value={user.address.zipCode}
                  error={errors.zipCode}
                  helperText={
                    errors.zipCode
                      ? 'The zip code you entered is in an invalid format'
                      : ''
                  }
                  onChange={handleChange}
                />
              </Box>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  City
                </Typography>
                <TextField
                  id="outlined-helperText"
                  label=""
                  name="address.city"
                  value={user.address.city}
                  error={errors.city}
                  helperText={
                    errors.city
                      ? 'The city name must start with a capital letter and should only contain letters, numbers or special characters such as an apostrophe or & sign'
                      : ''
                  }
                  onChange={handleChange}
                />
              </Box>
            </Box>
            <Divider />
            <CardActionsWrapper
              sx={{
                display: { xs: 'block', md: 'flex' },
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box>
                <Button variant="contained" onClick={handleSubmit}>
                  Register account
                </Button>
              </Box>
            </CardActionsWrapper>
          </Card>
        </Grid>
      </Container>
    </>
  );
}

export default RegistrationForm;
