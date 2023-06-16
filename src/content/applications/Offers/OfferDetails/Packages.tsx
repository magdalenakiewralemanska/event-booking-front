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
import { useState } from 'react';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { OfferPackage } from 'src/models/OfferPackage';

interface PackagesProps {
  offerId: string;
  eventId: string;
  offerPackages: OfferPackage[];
}

function Packages(props: PackagesProps) {
  const { eventId, offerId, offerPackages } = props;
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const navigate = useNavigate();

  const handlePackageSelection = (packageId: number) => {
    setSelectedPackageId((prevSelectedPackageId: number) =>
      prevSelectedPackageId === packageId ? null : packageId
    );
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
                  <Card
                    sx={{
                      px: 1
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          pt: 3
                        }}
                      >
                        <Box display={'flex'} justifyContent={'center'}>
                          <Typography
                            variant="h3"
                            gutterBottom
                            noWrap
                            textAlign={'center'}
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
                          image="/static/images/kid.jpg"
                          title="Contemplative Reptile"
                        />
                      </Box>
                      <Grid container spacing={3} p={4}>
                        <Grid sm item>
                          <Button
                            fullWidth
                            variant="outlined"
                            component={RouterLink}
                            to={`/packageDetails/${offerPackage.id}`}
                          >
                            Show package details
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid
                          sm
                          item
                          display={'flex'}
                          gap={3}
                          justifyContent={'center'}
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
                            <Button variant="outlined">Delete package</Button>
                          </Box>
                        </Grid>
                      </Grid>
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
