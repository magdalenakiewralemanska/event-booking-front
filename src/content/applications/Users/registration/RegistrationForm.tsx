import {
  Box,
  CardMedia,
  Typography,
  Card,
  CardHeader,
  Divider,
  Button,
  CardActions,
  TextField,
  Grid,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';

const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       padding: ${theme.spacing(3)};
  `
);

function RegistrationForm() {
  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          p={3}
        >
          <Card>
            <CardHeader />
            <CardMedia
              sx={{ minHeight: 280 }}
              image="/static/images/registration.jpg"
              title="Update"
            />
            <Box px={3} ml={3} mt={4}>
              <Typography variant="h3" sx={{ pb: 1 }}>
                Basic profile data:
              </Typography>
            </Box>
            <Box px={3} pb={2} display={'flex'} flexWrap={'wrap'}>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Username
                </Typography>
                <TextField required id="outlined-required" label="Required" />
              </Box>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Email
                </Typography>
                <TextField
                  required
                  id="outlined-required"
                  label="Required"
                  type="email"
                />
              </Box>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  First name
                </Typography>
                <TextField required id="outlined-required" label="Required" />
              </Box>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Last name
                </Typography>
                <TextField required id="outlined-required" label="Required" />
              </Box>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Phone number
                </Typography>
                <TextField id="outlined-helperText" label="" type="text" />
              </Box>
            </Box>
            <Box px={3} ml={3} mt={4}>
              <Typography variant="h3" sx={{ pb: 1 }}>
                Address data:
              </Typography>
            </Box>
            <Box px={3} pb={2} display={'flex'}>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Street
                </Typography>
                <TextField id="outlined-helperText" label="" />
              </Box>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  House number
                </Typography>
                <TextField
                  id="outlined-number"
                  label="Number"
                  type="number"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Box>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Appartment number
                </Typography>
                <TextField
                  id="outlined-number"
                  label="Number"
                  type="number"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Box>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  Zip-code
                </Typography>
                <TextField id="outlined-helperText" label="" type="zip-code" />
              </Box>
              <Box p={3}>
                <Typography variant="h4" sx={{ pb: 2 }}>
                  City
                </Typography>
                <TextField id="outlined-helperText" label="" />
              </Box>
            </Box>
            <Divider />
            <CardActionsWrapper
              sx={{
                display: { xs: 'block', md: 'flex' },
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box>
                <Button variant="contained">Register account</Button>
              </Box>
            </CardActionsWrapper>
          </Card>
        </Grid>
      </Container>
    </>
  );
}

export default RegistrationForm;
