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
  FormLabel
} from '@mui/material';
import axios from 'axios';

import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { OfferPackage } from 'src/models/OfferPackage';

const UpdatePackage = () => {
  const { eventId, offerId, packageId } = useParams();
  const parsedPackageId = parseInt(packageId);
  const parsedOfferId = parseInt(offerId);
  const [offerPackage, setOfferPackage] = useState<OfferPackage>({
    id: parsedPackageId,
    title: '',
    description: '',
    price: null,
    duration: null,
    maxAmountOfPeople: null,
    isOwnFoodAvailable: null,
    isOwnDrinkAvailable: null,
    specials: '',
    otherDetails: '',
    offerId: parsedOfferId
  });

  const navigate = useNavigate();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;

    if (name === 'duration' || name === 'maxAmountOfPeople') {
      const parsedValue = parseInt(value.replace(/^0+/, ''));
      setOfferPackage((prevPackage) => ({
        ...prevPackage,
        [name]: parsedValue
      }));
    } else if (name === 'price') {
      const formattedValue = parseFloat(value.replace(/^0+/, '')).toFixed(2);
      setOfferPackage((prevPackage) => ({
        ...prevPackage,
        [name]: Number(formattedValue)
      }));
    } else {
      setOfferPackage((prevPackage) => ({
        ...prevPackage,
        [name]: value
      }));
    }
  };

  async function updatePackage() {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/package/${offerPackage.id}`,
        offerPackage
      );
      const offerId = offerPackage.offerId;
      navigate(`/events/${eventId}/offers/${offerId}`);
    } catch (error) {
      console.error('Error update package:', error);
    }
  }

  useEffect(() => {
    async function fetchPackage() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/packageDetails/${packageId}`
        );
        const packageData = response.data;
        setOfferPackage(packageData);
      } catch (error) {
        console.error('Error fetching package:', error);
      }
    }

    fetchPackage();
  }, [packageId]);

  return (
    <Grid item xs={12} mt={3} p={3}>
      <Card>
        <CardHeader
          title="Package details"
          action={
            <Box>
              <Button variant="contained" onClick={updatePackage}>
                Update package
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
                      id="outlined-number"
                      label="Price in zł"
                      type="number"
                      name="price"
                      value={offerPackage.price}
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
                      id="outlined-number"
                      label="Duration in hours"
                      type="number"
                      name="duration"
                      value={offerPackage.duration}
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
                      id="outlined-number"
                      label="Amount of people"
                      type="number"
                      name="maxAmountOfPeople"
                      value={offerPackage.maxAmountOfPeople}
                      onChange={handleChange}
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
                  onChange={handleChange}
                />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card>
              <CardMedia
                sx={{ minHeight: 480 }}
                image="/static/images/kid.jpg"
                title="Update"
              />
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default UpdatePackage;
