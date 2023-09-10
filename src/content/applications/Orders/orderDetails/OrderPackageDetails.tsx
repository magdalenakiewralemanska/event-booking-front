import { Check, Clear } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  Divider,
  Grid,
  Box,
  Typography,
  CardMedia
} from '@mui/material';
import { Order } from 'src/models/Order';

interface OrderPackageDetailsProps {
  order: Order;
}

function OrderPackageDetails(props: OrderPackageDetailsProps) {
  const { order } = props;

  return (
    <Grid item xs={12} mt={3} p={3}>
      <Card>
        <CardHeader title="Package details" />
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
                  {order.offerPackage.title}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  Description:
                </Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ py: 2 }}>
                  {order.offerPackage.description}
                </Typography>
              </Box>

              <Grid container direction="row" alignItems="stretch">
                <Box pl={2} justifyContent={'left'}>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    Price:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    Duration:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    Maximal amount of people:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    Is own food available:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    Is own drink available:
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    Specials:
                  </Typography>
                </Box>
                <Box pl={5} justifyContent={'right'}>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    {order.offerPackage.price}
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    {order.offerPackage.duration}
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    {order.offerPackage.maxAmountOfPeople}
                  </Typography>
                  <Box>
                    {order.offerPackage.isOwnFoodAvailable ? (
                      <Check />
                    ) : (
                      <Clear />
                    )}
                  </Box>
                  <Box sx={{ py: 1 }}>
                    {order.offerPackage.isOwnDrinkAvailable ? (
                      <Check />
                    ) : (
                      <Clear />
                    )}
                  </Box>
                  <Typography variant="h4" fontWeight="normal">
                    {order.offerPackage.specials}
                  </Typography>
                </Box>
              </Grid>
              <Box p={2}>
                <Typography variant="h4" fontWeight="bold">
                  Other details:
                </Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ py: 2 }}>
                  {order.offerPackage.otherDetails}
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                sx={{ minHeight: 480 }}
                image={order.offerPackage.picturePath}
                title="kid"
              />
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default OrderPackageDetails;
