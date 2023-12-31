import {
  Card,
  CardHeader,
  Divider,
  Grid,
  Box,
  Typography,
  CardMedia,
  Button,
  styled,
  Avatar,
  Input,
  IconButton
} from '@mui/material';
import { Offer } from 'src/models/Offer';
import { NavLink as RouterLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from 'src/contexts/UserContext';
import { User } from 'src/models/User';

interface OfferDescriptionProps {
  offer: Offer;
  eventId: string;
  currentUser: User;
  isLoggedIn: boolean;
}

function OfferDescription(props: OfferDescriptionProps) {
  const { eventId, offer, currentUser, isLoggedIn } = props;

  return (
    <Grid item xs={12} mt={3}>
      <Card>
        <CardHeader
          title="Offer details"
          action={
            <Box display={'flex'} gap={3}>
              <Button
                variant="contained"
                color="warning"
                component={RouterLink}
                to={`/events/${eventId}/offers`}
              >
                Back to the offer list
              </Button>
              {isLoggedIn && currentUser.role === 'ADMIN' && (
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={`/${eventId}/${offer.id}/package`}
                >
                  Add new package for offer
                </Button>
              )}
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
          <Grid item xs={12} md={6}>
            <Card>
              <Box pl={2} pr={2}>
                <Typography variant="h3" fontWeight="bold" sx={{ py: 2 }}>
                  {offer.name}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  Why {offer.organizer}?
                </Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ py: 2 }}>
                  {offer.description}
                </Typography>
              </Box>

              <Grid container direction="column">
                <Box pl={5} justifyContent={'left'} display={'flex'}>
                  <Typography
                    variant="h4"
                    fontWeight="normal"
                    sx={{ py: 2, minWidth: 200 }}
                  >
                    Organizer:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    {offer.organizer}
                  </Typography>
                </Box>
                <Box pl={5} justifyContent={'left'} display={'flex'}>
                  <Typography
                    variant="h4"
                    fontWeight="normal"
                    sx={{ minWidth: 200 }}
                  >
                    Minimal age:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    {offer.minAge}
                  </Typography>
                </Box>
                <Box pl={5} justifyContent={'left'} display={'flex'}>
                  <Typography
                    variant="h4"
                    fontWeight="normal"
                    sx={{ py: 2, minWidth: 200 }}
                  >
                    Maximal age:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    {offer.maxAge}
                  </Typography>
                </Box>
                <Box pl={5} justifyContent={'left'} display={'flex'}>
                  <Typography
                    variant="h4"
                    fontWeight="normal"
                    sx={{ minWidth: 200 }}
                  >
                    Contact email:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    {offer.contactEmail}
                  </Typography>
                </Box>
                <Box pl={5} justifyContent={'left'} display={'flex'}>
                  <Typography
                    variant="h4"
                    fontWeight="normal"
                    sx={{ py: 2, minWidth: 200 }}
                  >
                    Contact phone:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    {offer.contactPhone}
                  </Typography>
                </Box>
                <Box pl={5} justifyContent={'left'} display={'flex'}>
                  <Typography
                    variant="h4"
                    fontWeight="normal"
                    sx={{ minWidth: 200 }}
                  >
                    Place:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    {offer.address.street} {offer.address.houseNumber}/
                    {offer.address.apartmentNumber}
                  </Typography>
                </Box>
                <Box pl={5} justifyContent={'left'} display={'flex'}>
                  <Typography
                    variant="h4"
                    fontWeight="normal"
                    sx={{ py: 1, minWidth: 200 }}
                  ></Typography>
                  <Typography
                    variant="h4"
                    fontWeight="normal"
                    sx={{ py: 1, pb: 5 }}
                  >
                    {offer.address.zipCode}
                    {offer.address.city}
                  </Typography>
                </Box>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card>
              <CardMedia
                sx={{ minHeight: 480 }}
                image={offer.picturePath}
                title="Update"
              />
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default OfferDescription;
