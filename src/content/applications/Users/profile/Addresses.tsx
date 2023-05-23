import {
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  Divider,
  Grid
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

function Addresses() {
  const addresses = {
    delivery: 12,
    shipping: 8
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader
            title="Delivery Addresses"
            subheader={addresses.delivery + ' saved addresses'}
          />
          <Divider />
          <Box p={2}>
            <Typography variant="caption" fontWeight="bold">
              Favourite
            </Typography>
            <Box sx={{ minHeight: { xs: 0, md: 122 } }} p={2}>
              <Typography variant="h5">Kadin Westervelt</Typography>
              <Typography variant="h5" sx={{ py: 1 }} fontWeight="normal">
                714-650-6297
              </Typography>
              <Typography variant="subtitle1">
                348 W. Goldfield Street Bethel Park, PA 15102
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader
            title="Shipping Addresses"
            subheader={addresses.shipping + ' saved addresses'}
          />
          <Divider />
          <Box p={2}>
            <Typography variant="caption" fontWeight="bold">
              Favourite
            </Typography>
            <Box sx={{ minHeight: { xs: 0, md: 122 } }} p={2}>
              <Typography variant="h5">Kadin Westervelt</Typography>
              <Typography variant="h5" sx={{ py: 1 }} fontWeight="normal">
                714-650-6297
              </Typography>
              <Typography variant="subtitle1">
                10 E. Wrangler Avenue Sioux Falls, SD 57103
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Box mt={4}>
        <Button
          size="medium"
          variant="contained"
          disableRipple
          component={RouterLink}
          to="/user/settings"
        >
          Update profile
        </Button>
      </Box>
    </Grid>
  );
}

export default Addresses;
