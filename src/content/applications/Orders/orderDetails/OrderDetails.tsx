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
import { NavLink as RouterLink } from 'react-router-dom';
import { Order } from 'src/models/Order';

interface OrderDetailsProps {
  order: Order;
}

function OrderDetails(props: OrderDetailsProps) {
  const { order } = props;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

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
                to={`/user/myEvents`}
              >
                Back to the order list
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
                  {order.offer.name}
                </Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ py: 2 }}>
                  {order.offer.description}
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
                    {order.offer.organizer}
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
                    {order.offer.minAge}
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
                    {order.offer.maxAge}
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
                    {order.offer.contactEmail}
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
                    {order.offer.contactPhone}
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
                    {order.offer.address.street}{' '}
                    {order.offer.address.houseNumber}/
                    {order.offer.address.apartmentNumber}
                  </Typography>
                </Box>
                <Box pl={5} justifyContent={'left'} display={'flex'}>
                  <Typography
                    variant="h4"
                    fontWeight="normal"
                    sx={{ py: 1, minWidth: 200 }}
                  ></Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 1 }}>
                    {order.offer.address.zipCode}
                    {order.offer.address.city}
                  </Typography>
                </Box>
                <Box pl={5} justifyContent={'left'} display={'flex'}>
                  <Typography
                    variant="h4"
                    fontWeight="normal"
                    sx={{ py: 2, minWidth: 200 }}
                  >
                    Date:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    {formatDate(new Date(order.date))}
                  </Typography>
                </Box>
                <Box pl={5} justifyContent={'left'} display={'flex'}>
                  <Typography
                    variant="h4"
                    fontWeight="normal"
                    sx={{ minWidth: 200 }}
                  >
                    Start hour:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    {order.startHour}
                  </Typography>
                </Box>
                <Box pl={5} justifyContent={'left'} display={'flex'}>
                  <Typography
                    variant="h4"
                    fontWeight="normal"
                    sx={{ minWidth: 200, py: 2 }}
                  >
                    End hour:
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight="normal"
                    sx={{ py: 2, pb: 5 }}
                  >
                    {order.endHour}
                  </Typography>
                </Box>
                <Box pl={5} justifyContent={'right'}></Box>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                sx={{ minHeight: 480 }}
                image={order.offer.picturePath}
                title="Balls"
              />
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default OrderDetails;
