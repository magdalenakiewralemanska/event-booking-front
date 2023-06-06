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
import { RoleEnum } from 'src/models/RoleEnum';
import { User } from 'src/models/User';

const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       padding: ${theme.spacing(3)};
  `
);

function RegistrationForm() {
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

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/registration`,
        user
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
                  onChange={handleChange}
                />
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
                  name="password"
                  value={user.password}
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
