import {
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  Divider,
  Grid,
  CardContent,
  CardMedia,
  Checkbox
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { authorizedApi } from 'src/interceptor/AxiosInterceptor';
import { OfferPackage } from 'src/models/OfferPackage';
import { User } from 'src/models/User';

interface PackagesProps {
  offerId: string;
  eventId: string;
  offerPackages: OfferPackage[];
  fetchPackages: () => void;
  onSelectPackage: (packageId: number) => void;
  currentUser: User;
  isLoggedIn: boolean;
}

function Packages(props: PackagesProps) {
  const {
    eventId,
    offerId,
    offerPackages,
    fetchPackages,
    onSelectPackage,
    currentUser,
    isLoggedIn
  } = props;
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(
    null
  );
  const navigate = useNavigate();

  const handlePackageSelection = (packageId: number) => {
    setSelectedPackageId(packageId);
    onSelectPackage(packageId); // Call the callback function with the selected package ID
  };

  const handlePackageDelete = async (packageId: number) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/package/${packageId}`
      );
      fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  console.log(offerPackages);
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Choose your package" />
          <Divider />
          <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={3}>
              {offerPackages.map((offerPackage: OfferPackage) => (
                <Grid xs={12} md={4} item key={offerPackage.id}>
                  <Card sx={{ px: 1 }}>
                    <CardContent>
                      <Box sx={{ pt: 3 }}>
                        <Box display="flex" justifyContent="center">
                          <Typography
                            variant="h3"
                            gutterBottom
                            noWrap
                            textAlign="center"
                            p={1}
                          >
                            {offerPackage.title}
                          </Typography>
                          <Checkbox
                            checked={selectedPackageId === offerPackage.id}
                            onChange={() =>
                              handlePackageSelection(offerPackage.id)
                            }
                          />
                        </Box>
                        <CardMedia
                          sx={{ height: 280 }}
                          component="img"
                          src={offerPackage.picturePath || ''}
                          title="Contemplative Reptile"
                        />
                      </Box>
                      <Grid container spacing={3} p={4}>
                        <Grid sm item>
                          <Button
                            fullWidth
                            variant="outlined"
                            component={RouterLink}
                            to={`/${eventId}/${offerId}/packageDetails/${offerPackage.id}`}
                          >
                            Show package details
                          </Button>
                        </Grid>
                      </Grid>
                      {isLoggedIn && currentUser.role === 'ADMIN' && (
                        <Grid container>
                          <Grid
                            sm
                            item
                            display="flex"
                            gap={3}
                            justifyContent="center"
                          >
                            <Box>
                              <Button
                                variant="contained"
                                onClick={() =>
                                  navigate(
                                    `/${eventId}/${offerId}/package/${offerPackage.id}`
                                  )
                                }
                              >
                                Update package
                              </Button>
                            </Box>
                            <Box>
                              <Button
                                variant="outlined"
                                onClick={() =>
                                  handlePackageDelete(offerPackage.id)
                                }
                              >
                                Delete package
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Packages;
