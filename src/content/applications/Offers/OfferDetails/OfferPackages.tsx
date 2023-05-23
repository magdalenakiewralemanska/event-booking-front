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
import { NavLink as RouterLink } from 'react-router-dom';

function Packages() {
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
              <Grid xs={12} md={4} item>
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
                          Secret Garden
                        </Typography>
                        <Checkbox defaultChecked />
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
                          to="/packageDetails"
                        >
                          Show package details
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} md={4} item>
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
                          Package 1 name
                        </Typography>
                        <Checkbox defaultChecked />
                      </Box>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="/static/images/kid.jpg"
                        title="Contemplative Reptile"
                      />
                    </Box>
                    <Grid container spacing={3} p={4}>
                      <Grid sm item>
                        <Button fullWidth variant="outlined">
                          Show package details
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} md={4} item>
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
                          Package 1 name
                        </Typography>
                        <Checkbox defaultChecked />
                      </Box>
                      <CardMedia
                        sx={{ height: 140 }}
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
                          to="/component/badges"
                        >
                          Show package details
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Packages;
