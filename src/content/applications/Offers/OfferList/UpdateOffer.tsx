import {
  Card,
  CardHeader,
  Divider,
  Grid,
  Box,
  Typography,
  CardMedia,
  Button,
  TextField
} from '@mui/material';
import { Offer } from 'src/models/Offer';
import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';

const UpdateOffer = () => {
  const { eventId, offerId } = useParams();
  const parsedEventId = parseInt(eventId);
  const parsedOfferId = parseInt(offerId);
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
    eventId: parsedEventId
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

  async function updateOffer() {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/events/${eventId}/offers/${offerId}`,
        offer
      );
      navigate(`/events/${eventId}/offers`);
    } catch (error) {
      console.error('Error saving offer:', error);
    }
  }

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
          title="Add your new offer"
          action={
            <Box>
              <Button
                variant="contained"
                size="large"
                sx={{ mr: 5 }}
                onClick={updateOffer}
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
                      onChange={handleChange}
                    />
                  </Box>
                </Box>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card>
              <CardMedia
                sx={{ minHeight: 480 }}
                image="/static/images/balls.jpg"
                title="Update"
              />
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default UpdateOffer;
