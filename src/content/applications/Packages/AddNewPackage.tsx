import {
  Card,
  CardHeader,
  Divider,
  Grid,
  Box,
  Typography,
  CardMedia,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Avatar,
  IconButton,
  Tooltip,
  styled
} from '@mui/material';
import axios from 'axios';

import { ChangeEvent, useState } from 'react';
import {
  NavLink as RouterLink,
  useNavigate,
  useParams
} from 'react-router-dom';
import { OfferPackage } from 'src/models/OfferPackage';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { authorizedApi } from 'src/interceptor/AxiosInterceptor';

const AddNewPackage = () => {
  const { eventId, offerId } = useParams();
  const parsedOfferId = parseInt(offerId);
  const [picturePath, setPicturePath] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [offerPackage, setOfferPackage] = useState<OfferPackage>({
    title: '',
    description: '',
    price: '',
    duration: null,
    maxAmountOfPeople: null,
    isOwnFoodAvailable: null,
    isOwnDrinkAvailable: null,
    specials: '',
    otherDetails: '',
    offerId: parsedOfferId,
    picturePath: ''
  });

  const navigate = useNavigate();

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = event.target;

    if (name === 'duration' || name === 'maxAmountOfPeople') {
      const parsedValue = parseInt(value.replace(/^0+/, ''));
      setOfferPackage((prevPackage) => ({
        ...prevPackage,
        [name]: parsedValue
      }));
    } else {
      setOfferPackage((prevPackage) => ({
        ...prevPackage,
        [name]: value
      }));
    }
  }

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setPicturePath(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const ImageWrapper = styled(CardMedia)(
    ({ theme }) => `
      position: relative;
  
      .MuiAvatar-root {
        width: ${theme.spacing(55)};
        height: ${theme.spacing(50)};
      }`
  );

  const ButtonUploadWrapper = styled(Box)(
    ({ theme }) => `
    position: absolute;
    bottom: ${theme.spacing(2)};
    right: ${theme.spacing(2)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.palette.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};;
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      padding: 1;

      &:hover {
        background: ${theme.palette.primary.dark};
      }
    }
  `
  );

  const Input = styled('input')({
    display: 'none'
  });

  const validatePackageDetails = (): boolean => {
    const validationErrors: Record<string, boolean> = {};
    const priceRegex = /^(?!-)\d+(\.\d{1,2})?$/;

    if (offerPackage.title.length < 3 || offerPackage.title.length > 200) {
      validationErrors.title = true;
    }
    if (
      offerPackage.description.length < 10 ||
      offerPackage.description.length > 5000
    ) {
      validationErrors.description = true;
    }
    if (!priceRegex.test(offerPackage.price)) {
      validationErrors.price = true;
    }
    if (offerPackage.duration < 1 || offerPackage.duration > 24) {
      validationErrors.duration = true;
    }
    if (offerPackage.maxAmountOfPeople < 1) {
      validationErrors.maxAmountOfPeople = true;
    }
    if (offerPackage.specials.length > 200) {
      validationErrors.specials = true;
    }
    if (offerPackage.otherDetails.length > 5000) {
      validationErrors.otherDetails = true;
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  async function savePackage() {
    try {
      const packageToSave = {
        ...offerPackage,
        picturePath: picturePath
      };

      if (!validatePackageDetails()) {
        return;
      }
      await axios.post(
        `${process.env.REACT_APP_API_URL}/package`,
        packageToSave
      );
      const offerId = offerPackage.offerId;
      navigate(`/events/${eventId}/offers/${offerId}`);
    } catch (error) {
      console.error('Error saving package:', error);
    }
  }

  return (
    <Grid item xs={12} mt={3} p={3}>
      <Card>
        <CardHeader
          title="Package details"
          action={
            <Box display={'flex'} gap={3}>
              <Button
                variant="contained"
                color="warning"
                component={RouterLink}
                to={`/events/${eventId}/offers/${offerId}`}
              >
                Back to the offer
              </Button>
              <Button variant="contained" onClick={savePackage}>
                Save package
              </Button>
            </Box>
          }
        />
        <Divider />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          p={3}
        >
          <Grid item xs={12} md={7}>
            <Card>
              <Box pl={2} pr={2}>
                <Typography variant="h3" fontWeight="bold" sx={{ py: 2 }}>
                  Title
                </Typography>
                <TextField
                  required
                  id="outlined-required"
                  label="Required"
                  name="title"
                  sx={{ width: '100%' }}
                  value={offerPackage.title}
                  error={errors.title}
                  helperText={
                    errors.title
                      ? 'Package title must have at least 3 signs but not more than 200'
                      : ''
                  }
                  onChange={handleChange}
                />

                <Typography variant="h3" fontWeight="bold" sx={{ py: 2 }}>
                  Description:
                </Typography>
                <TextField
                  required
                  id="outlined-textarea"
                  label="Required"
                  placeholder="Description..."
                  multiline
                  sx={{ width: '100%' }}
                  rows={6}
                  name="description"
                  value={offerPackage.description}
                  error={errors.description}
                  helperText={
                    errors.description
                      ? 'Offer description must have at least 10 signs but not more than 5000'
                      : ''
                  }
                  onChange={handleChange}
                />
              </Box>

              <Grid container direction="row" alignItems="stretch">
                <Box ml={3} mt={4}>
                  <Typography variant="h3" sx={{ pb: 1 }}>
                    Basic package data:
                  </Typography>
                </Box>
                <Box px={3} pb={2} display={'flex'}>
                  <Box p={1}>
                    <Typography variant="h4" sx={{ pb: 2 }}>
                      Price
                    </Typography>
                    <TextField
                      required
                      id="outlined-number"
                      label="Price in zł"
                      placeholder="Required*"
                      type="text"
                      name="price"
                      value={offerPackage.price ?? ''}
                      error={errors.price}
                      helperText={
                        errors.price
                          ? 'The price must be a positive number and have no more than two decimal places'
                          : ''
                      }
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true
                      }}
                      inputProps={{
                        step: 0.01
                      }}
                    />
                  </Box>
                  <Box p={1}>
                    <Typography variant="h4" sx={{ pb: 2 }}>
                      Duration
                    </Typography>
                    <TextField
                      required
                      id="outlined-number"
                      placeholder="Required*"
                      label="Duration in hours"
                      type="number"
                      name="duration"
                      value={offerPackage.duration ?? ''}
                      error={errors.duration}
                      helperText={
                        errors.duration
                          ? 'Duration must be a number between 1 and 24 and cannot contain fractional values'
                          : ''
                      }
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Box>
                  <Box p={1}>
                    <Typography variant="h4" sx={{ pb: 2 }}>
                      Max amount of people
                    </Typography>
                    <TextField
                      required
                      id="outlined-number"
                      label="Amount of people"
                      placeholder="Required*"
                      type="number"
                      name="maxAmountOfPeople"
                      value={offerPackage.maxAmountOfPeople ?? ''}
                      onChange={handleChange}
                      error={errors.maxAmountOfPeople}
                      helperText={
                        errors.maxAmountOfPeople
                          ? 'The number of people who can take part in the event must be at least one'
                          : ''
                      }
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Box>
                </Box>
                <Box pl={5} justifyContent={'right'} display={'flex'}>
                  <Box p={2}>
                    <Typography variant="h4" sx={{ pb: 1 }}>
                      Is own food available?
                    </Typography>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Select an option</FormLabel>
                      <RadioGroup
                        aria-label="isOwnFoodAvailable"
                        name="isOwnFoodAvailable"
                        value={String(offerPackage.isOwnFoodAvailable)}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Box p={2}>
                    <Typography variant="h4" sx={{ pb: 1 }}>
                      Is own drink available?
                    </Typography>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Select an option</FormLabel>
                      <RadioGroup
                        aria-label="isOwnDrinkAvailable"
                        name="isOwnDrinkAvailable"
                        value={String(offerPackage.isOwnDrinkAvailable)}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              <Box p={2}>
                <Box>
                  <Typography variant="h4" fontWeight="bold" pb={1}>
                    Specials:
                  </Typography>
                  <TextField
                    required
                    id="outlined-textarea"
                    placeholder="Add your special benefits"
                    multiline
                    sx={{ width: '100%', pb: 2 }}
                    rows={6}
                    name="specials"
                    value={offerPackage.specials}
                    error={errors.specials}
                    helperText={
                      errors.specials
                        ? 'Your specials should have not more than 200 signs'
                        : ''
                    }
                    onChange={handleChange}
                  />
                </Box>
                <Typography variant="h4" fontWeight="bold" pb={1}>
                  Other details:
                </Typography>
                <TextField
                  required
                  id="outlined-textarea"
                  placeholder="Here you can provide every other details for your offer package"
                  multiline
                  sx={{ width: '100%' }}
                  rows={6}
                  name="otherDetails"
                  value={offerPackage.otherDetails}
                  error={errors.otherDetails}
                  helperText={
                    errors.otherDetails
                      ? 'Your details should have not more than 5000 signs'
                      : ''
                  }
                  onChange={handleChange}
                />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card>
              <Tooltip arrow title="Click at arrow to add a picture">
                <ImageWrapper>
                  {picturePath ? (
                    <Avatar variant="rounded" alt="image" src={picturePath} />
                  ) : (
                    <Avatar
                      variant="rounded"
                      alt="image"
                      src="/static/images/kid.jpg"
                    />
                  )}

                  <ButtonUploadWrapper>
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      name="icon-button-file"
                      type="file"
                      onChange={handleFileInputChange}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton component="span" color="primary">
                        <UploadTwoToneIcon style={{ fontSize: '3rem' }} />
                      </IconButton>
                    </label>
                  </ButtonUploadWrapper>
                </ImageWrapper>
              </Tooltip>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default AddNewPackage;
