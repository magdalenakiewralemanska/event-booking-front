import {
  Card,
  CardHeader,
  Divider,
  Grid,
  Box,
  Typography,
  CardMedia,
  Button
} from '@mui/material';
import { Offer } from 'src/models/Offer';
import { NavLink as RouterLink } from 'react-router-dom';

interface OfferDescriptionProps {
  offer: Offer;
  eventId: string;
}

function OfferDescription(props: OfferDescriptionProps) {
  const { eventId, offer } = props;
  return (
    <Grid item xs={12} mt={3}>
      <Card>
        <CardHeader
          title="Offer details"
          action={
            <Box>
              <Button
                variant="contained"
                component={RouterLink}
                to={`/${eventId}/${offer.id}/package`}
              >
                Add new package for offer
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

              <Grid container direction="row" alignItems="stretch">
                <Box pl={2} justifyContent={'left'}>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    Organizer:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    Minimal age:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    Maximal age:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    Contact:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    Address:
                  </Typography>
                </Box>
                <Box pl={5} justifyContent={'right'}>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    {offer.organizer}
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    {offer.minAge}
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    {offer.maxAge}
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    {offer.contact}
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    {offer.address.street} {offer.address.houseNumber}/
                    {offer.address.apartmentNumber}
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ pb: 2 }}>
                    {offer.address.zipCode} {offer.address.city}
                  </Typography>
                </Box>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
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
}

export default OfferDescription;
