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
  IconButton,
  Avatar,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from 'src/contexts/UserContext';
import { User } from 'src/models/User';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { toast } from 'react-toastify';
import { UserLogout } from '../Login/Logout';
import { authorizedApi } from 'src/interceptor/AxiosInterceptor';
import { ACCESS_TOKEN } from 'src/constants/constants';

const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(3)};
  `
);

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

  position: relative;
  overflow: visible;
  display: inline-block;
  margin-top: -${theme.spacing(9)};
  margin-left: ${theme.spacing(2)};

  .MuiAvatar-root {
    width: ${theme.spacing(25)};
    height: ${theme.spacing(25)};
  }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
  position: absolute;
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
  bottom: ${theme.spacing(2)};
  right: ${theme.spacing(2)};

  .MuiIconButton-root {
    border-radius: 100%;
    background: ${theme.colors.primary.main};
    color: ${theme.palette.primary.contrastText};
    box-shadow: ${theme.colors.shadows.primary};
    width: ${theme.spacing(6)};
    height: ${theme.spacing(6)};
    padding: 0;

    &:hover {
      background: ${theme.colors.primary.dark};
    }
  }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
  position: relative;

  .MuiCardMedia-root {
    height: ${theme.spacing(26)};
    
  }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
  position: absolute;
  right: ${theme.spacing(2)};
  bottom: ${theme.spacing(2)};
`
);

function EditProfileTab() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const { currentUser, userModifier } = useContext(UserContext);
  const [user, setUser] = useState<User | null>(currentUser);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `/user/details/${currentUser.username}`
        );
        const userData = response.data;
        setUser(userData);
        console.log(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  const handleFieldChange = (field: string, value: string) => {
    if (user) {
      setUser((prevUser) => ({
        ...prevUser,
        [field]: value
      }));
    }
  };

  const handleFileInputForBackgroundChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;

        setUser((prevUser) => ({
          ...prevUser,
          backgroundPicturePath: base64String
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        backgroundPicturePath: prevUser.backgroundPicturePath // Keep the existing picturePath value
      }));
    }
  };

  const handleFileInputForProfileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;

        setUser((prevUser) => ({
          ...prevUser,
          profilePicturePath: base64String
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        profilePicturePath: prevUser.profilePicturePath // Keep the existing picturePath value
      }));
    }
  };

  const handleAddressFieldChange = (field: string, value: string) => {
    if (user) {
      setUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [field]: value
        }
      }));
    }
  };

  const validateUserDetails = (): boolean => {
    const validationErrors: Record<string, boolean> = {};
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex =
      /^\+?[1-9](?:\d{1,9}\s?)?(?:\(\d{1,9}\))?(?:\s?\d{2,8}){1,5}$/;
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

  async function updateUser() {
    try {
      if (user) {
        if (!validateUserDetails()) {
          return;
        }
        await axios.put(
          `${process.env.REACT_APP_API_URL}/user/update/${user.id}`,
          user
        );
        userModifier(user); // Update user data in the context

        navigate(`/user/details`);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  const handleDeleteUser = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/user/${currentUser.id}`
      );
      localStorage.removeItem(ACCESS_TOKEN);
      userModifier(null); // Clear the user context
      toast.success('User deleted successfully', {
        position: toast.POSITION.TOP_CENTER
      });

      navigate('/events');
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };

  return (
    <Card>
      <Box display="flex" justifyContent="center">
        <Grid sx={{ px: 3, width: '90%' }}>
          <CardHeader />
          <CardCover>
            <CardMedia
              image={
                user.backgroundPicturePath ||
                '/static/images/user-background.jpg'
              }
            />

            <CardCoverAction>
              <Input
                accept="image/*"
                id="change-cover"
                multiple
                type="file"
                onChange={handleFileInputForBackgroundChange}
              />
              <label htmlFor="change-cover">
                <Button
                  startIcon={<UploadTwoToneIcon />}
                  variant="contained"
                  component="span"
                >
                  Change cover
                </Button>
              </label>
            </CardCoverAction>
          </CardCover>
          <AvatarWrapper>
            <Avatar
              variant="rounded"
              alt={user.username}
              src={user.profilePicturePath}
            />
            <ButtonUploadWrapper>
              <Input
                accept="image/*"
                id="icon-button-file"
                name="icon-button-file"
                type="file"
                onChange={handleFileInputForProfileChange}
              />
              <label htmlFor="icon-button-file">
                <IconButton component="span" color="primary">
                  <UploadTwoToneIcon />
                </IconButton>
              </label>
            </ButtonUploadWrapper>
          </AvatarWrapper>
        </Grid>
      </Box>
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
            value={user.username}
            error={errors.username}
            helperText={
              errors.username
                ? "Username can only contain letters, numbers and special characters such as $%&!'*#@"
                : ''
            }
            onChange={(event) =>
              handleFieldChange('username', event.target.value)
            }
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
            value={user.email}
            error={errors.email}
            helperText={
              errors.email
                ? 'Your email pattern is incorrect. Please check that all important elements like "@" or "." have been entered correctly'
                : ''
            }
            onChange={(event) => handleFieldChange('email', event.target.value)}
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
            value={user.firstName}
            error={errors.firstName}
            helperText={
              errors.firstName
                ? 'Name should have at least 2 signs but not more than 20'
                : ''
            }
            onChange={(event) =>
              handleFieldChange('firstName', event.target.value)
            }
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
            value={user.lastName}
            error={errors.lastName}
            helperText={
              errors.lastName
                ? 'Surname should have at least 2 signs but not more than 20'
                : ''
            }
            onChange={(event) =>
              handleFieldChange('lastName', event.target.value)
            }
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
            value={user.phoneNumber}
            error={errors.phoneNumber}
            helperText={
              errors.phoneNumber
                ? 'The phone number you entered is in an invalid format'
                : ''
            }
            onChange={(event) =>
              handleFieldChange('phoneNumber', event.target.value)
            }
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
            value={user.address.street}
            error={errors.street}
            helperText={
              errors.street
                ? 'The street name must start with a capital letter and should only contain letters, numbers or special characters such as an apostrophe or & sign'
                : ''
            }
            onChange={(event) =>
              handleAddressFieldChange('street', event.target.value)
            }
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
            InputLabelProps={{
              shrink: true
            }}
            value={user.address.houseNumber}
            error={errors.houseNumber}
            helperText={
              errors.houseNumber
                ? 'House number should start with a number, it can contain one uppercase or lowercase letter, but there should be no more digits after the letter'
                : ''
            }
            onChange={(event) =>
              handleAddressFieldChange('houseNumber', event.target.value)
            }
          />
        </Box>
        <Box p={3}>
          <Typography variant="h4" sx={{ pb: 2 }}>
            Apartment number
          </Typography>
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            value={user.address.apartmentNumber}
            error={errors.apartmentNumber}
            helperText={
              errors.apartmentNumber
                ? 'Apartment number should start with a number, it can contain one uppercase or lowercase letter, but there should be no more digits after the letter'
                : ''
            }
            onChange={(event) =>
              handleAddressFieldChange('apartmentNumber', event.target.value)
            }
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
            value={user.address.zipCode}
            error={errors.zipCode}
            helperText={
              errors.zipCode
                ? 'The zip code you entered is in an invalid format'
                : ''
            }
            onChange={(event) =>
              handleAddressFieldChange('zipCode', event.target.value)
            }
          />
        </Box>
        <Box p={3}>
          <Typography variant="h4" sx={{ pb: 2 }}>
            City
          </Typography>
          <TextField
            id="outlined-helperText"
            label=""
            value={user.address.city}
            error={errors.city}
            helperText={
              errors.city
                ? 'The city name must start with a capital letter and should only contain letters, numbers or special characters such as an apostrophe or & sign'
                : ''
            }
            onChange={(event) =>
              handleAddressFieldChange('city', event.target.value)
            }
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
          <Button variant="contained" onClick={updateUser}>
            Save changes
          </Button>
          <Button variant="outlined" sx={{ mx: 2 }} onClick={handleDeleteUser}>
            Delete profile
          </Button>
        </Box>
      </CardActionsWrapper>
    </Card>
  );
}

export default EditProfileTab;
