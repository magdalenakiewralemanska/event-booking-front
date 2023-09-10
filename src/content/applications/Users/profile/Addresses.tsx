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
import { User } from 'src/models/User';

interface AddressProps {
  user: User;
}

function Addresses({ user }: AddressProps) {
  return (
      <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
      >
        <Grid item xs={12} md={12}>
          <Card>
            <CardHeader
                title="Your Address"
                sx={{
                  textAlign: 'center',
                  backgroundColor: 'lightgray'
                }}
            />
            <Divider />
            <Box p={2} textAlign={'center'}>
              <Typography variant="caption" fontWeight="bold">
                {user.address.city}
              </Typography>
              <Box p={2}>
                <Typography variant="h5">
                  {user.address.street} {user.address.houseNumber}/
                  {user.address.apartmentNumber}
                </Typography>
                <Typography variant="h5" sx={{ py: 1 }} fontWeight="normal">
                  {user.address.zipCode} {user.address.city}
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
