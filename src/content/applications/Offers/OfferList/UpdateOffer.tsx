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
  styled,
  IconButton,
  Avatar,
  Tooltip,
  CardActionArea,
  CardContent
} from '@mui/material';
import { Offer } from 'src/models/Offer';
import {
  NavLink as RouterLink,
  useNavigate,
  useParams
} from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { TimePeriod } from 'src/models/TimePeriod';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import AddWeekScheduleModal from './AddWeekScheduleModal';
import { toast } from 'react-toastify';
import { DaySchedule } from 'src/models/DaySchedule';
import UpdateWeekScheduleModal from './UpdateWeekScheduleModal';
import { set } from 'date-fns';
import { authorizedApi } from 'src/interceptor/AxiosInterceptor';

const UpdateOffer = () => {
  const { eventId, offerId } = useParams();
  const parsedEventId = parseInt(eventId);
  const parsedOfferId = parseInt(offerId);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [offer, setOffer] = useState<Offer>({
    id: parsedOfferId,
    name: '',
    description: '',
    minAge: null,
    maxAge: null,
    organizer: '',
    contactEmail: '',
    contactPhone: '',

    address: {
      street: '',
      houseNumber: '',
      apartmentNumber: '',
      zipCode: '',
      city: ''
    },

    eventId: parsedEventId,
    picturePath: '',
    weekSchedule: []
  });
  const navigate = useNavigate();

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = event.target;

    if (name === 'minAge' || name === 'maxAge') {
      const parsedValue = parseInt(value.replace(/^0+/, ''));
      setOffer((prevOffer) => ({
        ...prevOffer,
        [name]: parsedValue
      }));
    } else if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setOffer((prevOffer) => ({
        ...prevOffer,
        address: {
          ...prevOffer.address,
          [addressField]: value
        }
      }));
    } else {
      setOffer((prevOffer) => ({
        ...prevOffer,
        [name]: value
      }));
    }
  }

  const handleCloseUpdate = () => {
    setOpenUpdateModal(false);
  };

  const handleClickUpdate = () => {
    setOpenUpdateModal(true);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;

        setOffer((prevOffer) => ({
          ...prevOffer,
          picturePath: base64String
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setOffer((prevOffer) => ({
        ...prevOffer,
        picturePath: prevOffer.picturePath // Keep the existing picturePath value
      }));
    }
  };

  const ImageWrapper = styled(CardMedia)(
    ({ theme }) => `
      position: relative;
  
      .MuiAvatar-root {
        width: ${theme.spacing(70)};
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

  const validateOfferTitleDetails = (): boolean => {
    const validationErrors: Record<string, boolean> = {};
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex =
      /^\+?[1-9](?:\d{1,9}\s?)?(?:\(\d{1,9}\))?(?:\s?\d{2,8}){1,5}$/;
    const addressNumberRegex = /^(\d+[A-Za-z]?|)$/;
    const zipCodeRegex = /^$|^\d{2}-\d{3}$/;

    if (offer.name.length < 3 || offer.name.length > 200) {
      validationErrors.name = true;
    }
    if (offer.description.length < 10 || offer.description.length > 5000) {
      validationErrors.description = true;
    }
    if (!offer.organizer) {
      validationErrors.organizer = true;
    }
    if (offer.minAge < 1 || offer.minAge > 99) {
      validationErrors.minAge = true;
    }
    if (offer.maxAge < 1 || offer.maxAge > 115) {
      validationErrors.maxAge = true;
    }
    if (!emailRegex.test(offer.contactEmail)) {
      validationErrors.contactEmail = true;
    }
    if (!phoneRegex.test(offer.contactPhone)) {
      validationErrors.contactPhone = true;
    }
    if (offer.address.street.length < 2 || offer.address.street.length > 25) {
      validationErrors.street = true;
    }
    if (!addressNumberRegex.test(offer.address.houseNumber)) {
      validationErrors.houseNumber = true;
    }
    if (!addressNumberRegex.test(offer.address.apartmentNumber)) {
      validationErrors.apartmentNumber = true;
    }
    if (!zipCodeRegex.test(offer.address.zipCode)) {
      validationErrors.zipCode = true;
    }
    if (offer.address.city.length < 2 || offer.address.city.length > 20) {
      validationErrors.city = true;
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const updateOffer = async (weekSchedule: DaySchedule[]) => {
    try {
      const offerToUpdate = {
        ...offer,

        weekSchedule: weekSchedule
      };

      if (!validateOfferTitleDetails()) {
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/events/${eventId}/offers/${offerId}`,
        offerToUpdate
      );
      console.log(response.data);
      toast.success('Offer update successfully', {
        position: toast.POSITION.TOP_CENTER
      });
      navigate(`/events/${eventId}/offers`);
    } catch (error) {
      console.error('Error saving offer:', error);
    }
  };

  const updateOfferWithoutWeekSchedule = async () => {
    try {
      const offerToUpdate = {
        ...offer
      };

      if (!validateOfferTitleDetails()) {
        return;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/events/${eventId}/offers/update/${offerId}`,
        offerToUpdate
      );
      console.log(response.data);
      toast.success('Offer update successfully', {
        position: toast.POSITION.TOP_CENTER
      });
      navigate(`/events/${eventId}/offers`);
    } catch (error) {
      console.error('Error saving offer:', error);
    }
  };

  const handleUpdateWeekSchedule = (weekSchedule: DaySchedule[]) => {
    updateOffer(weekSchedule);
  };

  useEffect(() => {
    async function fetchOffer() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/events/${eventId}/offers/${offerId}`
        );
        const offerData = response.data;
        setOffer(offerData);
      } catch (error) {
        console.error('Error fetching package:', error);
      }
    }

    fetchOffer();
  }, [offerId]);

  return (
    <Grid item xs={12} mt={3}>
      <Card>
        <CardHeader
          title="What would you like to change?"
          action={
            <Box display={'flex'} gap={3}>
              <Box>
                <Button
                  variant="contained"
                  color="warning"
                  component={RouterLink}
                  to={`/events/${eventId}/offers`}
                >
                  Back to the offer list
                </Button>
              </Box>

              <Button
                variant="contained"
                onClick={updateOfferWithoutWeekSchedule}
              >
                Update offer
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
                  name="name"
                  sx={{ width: '100%' }}
                  value={offer.name}
                  onChange={handleChange}
                />
                <Typography variant="h4" fontWeight="bold" sx={{ py: 2 }}>
                  Description
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
                  value={offer.description}
                  error={errors.description}
                  helperText={
                    errors.description
                      ? 'Offer description must have at least 10 letters but not more than 5000'
                      : ''
                  }
                  onChange={handleChange}
                />
              </Box>

              <Grid container direction="row" alignItems="stretch">
                <Box ml={3} mt={4}>
                  <Typography variant="h3" sx={{ pb: 1 }}>
                    Basic offer data:
                  </Typography>
                </Box>
                <Box px={3} gap={2} display={'flex'} flexWrap={'wrap'}>
                  <Typography variant="h4">Organizer</Typography>
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    name="organizer"
                    sx={{ width: '100%' }}
                    value={offer.organizer}
                    error={errors.organizer}
                    helperText={
                      errors.organizer ? 'Organizer name is required' : ''
                    }
                    onChange={handleChange}
                  />

                  <Box pt={2}>
                    <Typography variant="h4" sx={{ pb: 2 }}>
                      Minimal age
                    </Typography>
                    <TextField
                      id="outlined-number"
                      label="Provide minimal age for participant"
                      type="number"
                      name="minAge"
                      value={offer.minAge}
                      error={errors.minAge}
                      helperText={
                        errors.minAge
                          ? 'Minimal age must be a number between 1 and 99'
                          : ''
                      }
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Box>
                  <Box pt={2}>
                    <Typography variant="h4" sx={{ pb: 2 }}>
                      Maximal age
                    </Typography>
                    <TextField
                      id="outlined-number"
                      label="Provide maximal age for participant"
                      type="number"
                      name="maxAge"
                      value={offer.maxAge}
                      error={errors.maxAge}
                      helperText={
                        errors.maxAge
                          ? 'Maximal age must be a number between 1 and 115'
                          : ''
                      }
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Box>
                  <Box pt={2}>
                    <Typography variant="h4" sx={{ pb: 2 }}>
                      Contact Email
                    </Typography>
                    <TextField
                      required
                      id="outlined-required"
                      label="Required"
                      type="email"
                      name="contactEmail"
                      value={offer.contactEmail}
                      error={errors.contactEmail}
                      helperText={
                        errors.contactEmail
                          ? 'Your email pattern is incorrect. Please check that all important elements like "@" or "." have been entered correctly'
                          : ''
                      }
                      onChange={handleChange}
                    />
                  </Box>
                  <Box pt={2}>
                    <Typography variant="h4" sx={{ pb: 2 }}>
                      Contact Phone
                    </Typography>
                    <TextField
                      required
                      id="outlined-required"
                      label="Required"
                      type="text"
                      name="contactPhone"
                      value={offer.contactPhone}
                      error={errors.contactPhone}
                      helperText={
                        errors.contactPhone
                          ? 'The phone number you entered is in an invalid format'
                          : ''
                      }
                      onChange={handleChange}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid container direction="row" alignItems="stretch">
                <Box ml={3} mt={4}>
                  <Typography variant="h3" sx={{ pb: 1 }}>
                    Place details:
                  </Typography>
                </Box>
                <Box px={3} pb={2} gap={2} display={'flex'} flexWrap={'wrap'}>
                  <Box pt={2}>
                    <Typography variant="h4" sx={{ pb: 2 }}>
                      Street
                    </Typography>
                    <TextField
                      id="outlined-helperText"
                      label="street"
                      name="address.street"
                      value={offer.address.street}
                      error={errors.street}
                      helperText={
                        errors.street
                          ? 'The street name must start with a capital letter and should only contain letters, numbers or special characters such as an apostrophe or & sign'
                          : ''
                      }
                      onChange={handleChange}
                    />
                  </Box>
                  <Box pt={2}>
                    <Typography variant="h4" sx={{ pb: 2 }}>
                      House number
                    </Typography>
                    <TextField
                      id="outlined-number"
                      label="house number"
                      type="number"
                      name="address.houseNumber"
                      value={offer.address.houseNumber}
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
                  <Box pt={2}>
                    <Typography variant="h4" sx={{ pb: 2 }}>
                      Appartment number
                    </Typography>
                    <TextField
                      id="outlined-number"
                      label="appartment number"
                      type="number"
                      name="address.apartmentNumber"
                      value={offer.address.apartmentNumber}
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
                  <Box pt={2}>
                    <Typography variant="h4" sx={{ pb: 2 }}>
                      Zip-code
                    </Typography>
                    <TextField
                      id="outlined-helperText"
                      label=""
                      type="zip-code"
                      name="address.zipCode"
                      value={offer.address.zipCode}
                      error={errors.zipCode}
                      helperText={
                        errors.zipCode
                          ? 'The zip code you entered is in an invalid format'
                          : ''
                      }
                      onChange={handleChange}
                    />
                  </Box>
                  <Box pt={2}>
                    <Typography variant="h4" sx={{ pb: 2 }}>
                      City
                    </Typography>
                    <TextField
                      id="outlined-helperText"
                      label=""
                      name="address.city"
                      value={offer.address.city}
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
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card>
              <Tooltip arrow title="Click at arrow to add a picture">
                <ImageWrapper>
                  <Avatar
                    variant="rounded"
                    alt="image"
                    src={offer.picturePath}
                  />

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
            <Grid container justifyContent="center" alignItems="center">
              <Grid xs={12} md={8} item p={3}>
                <Tooltip arrow title="Feature in preparation">
                  <Button variant={'contained'} color={'info'}>
                    Click to change dates and hours for current offer
                  </Button>
                </Tooltip>
                <UpdateWeekScheduleModal
                  open={openUpdateModal}
                  onClose={handleCloseUpdate}
                  onUpdate={handleUpdateWeekSchedule}
                  offer={offer}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default UpdateOffer;
