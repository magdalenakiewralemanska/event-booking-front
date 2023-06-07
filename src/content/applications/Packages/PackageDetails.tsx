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
import axios from 'axios';
import { useEffect, useState } from 'react';
import { OfferPackage } from 'src/models/OfferPackage';

function PackageDetails({ packageId }) {
  const [packageDetails, setPackageDetails] = useState<OfferPackage | null>(
    null
  );

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get<OfferPackage>(
          `${process.env.REACT_APP_API_URL}/packageDetails/${packageId}`
        );
        const packageData = response.data;
        setPackageDetails(packageData);
      } catch (error) {
        console.error('Error fetching package details:', error);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

  if (!packageDetails) {
    return <div>Loading...</div>;
  }

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
                  {packageDetails.title}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  Description:
                </Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ py: 2 }}>
                  {packageDetails.description}
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
                    {packageDetails.price}
                  </Typography>
                  <Typography variant="h4" fontWeight="normal">
                    {packageDetails.duration}
                  </Typography>
                  <Typography variant="h4" fontWeight="normal" sx={{ py: 2 }}>
                    {packageDetails.maxAmountOfPeople}
                  </Typography>
                  <Box>
                    {packageDetails.isOwnFoodAvailable ? <Check /> : <Clear />}
                  </Box>
                  <Box sx={{ py: 1 }}>
                    {packageDetails.isOwnDrinkAvailable ? <Check /> : <Clear />}
                  </Box>
                  <Typography variant="h4" fontWeight="normal">
                    {packageDetails.specials}
                  </Typography>
                </Box>
              </Grid>
              <Box p={2}>
                <Typography variant="h4" fontWeight="bold">
                  Other details:
                </Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ py: 2 }}>
                  {packageDetails.otherDetails}
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
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
}

export default PackageDetails;
