import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  TextField,
  Container
} from '@mui/material';

import { Helmet } from 'react-helmet-async';
import LockIcon from '@mui/icons-material/Lock';

function Login() {
  return (
    <>
      <Helmet>
        <title>Tooltips - Components</title>
      </Helmet>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          p={3}
        >
          <Grid item xs={6}>
            <Card>
              <Box
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h3" gutterBottom>
                    Log into your account
                  </Typography>
                </Box>
                <Button variant="text">
                  <LockIcon sx={{ mr: 1 }} />
                  Log in
                </Button>
              </Box>
              <Divider />
              <CardContent sx={{ p: 4 }}>
                <Box px={3} pb={2}>
                  <Box p={1}>
                    <Typography variant="h4" sx={{ pb: 2 }}>
                      Username
                    </Typography>
                    <TextField
                      required
                      id="outlined-required"
                      label="Required"
                      sx={{ minWidth: 400 }}
                    />
                  </Box>
                  <Box p={1}>
                    <Typography variant="h4" sx={{ pb: 2 }}>
                      Password
                    </Typography>
                    <TextField
                      required
                      id="outlined-required"
                      label="Required"
                      type="email"
                      sx={{ minWidth: 400 }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Login;
