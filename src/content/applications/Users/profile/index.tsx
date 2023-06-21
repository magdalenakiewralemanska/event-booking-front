import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import { Grid, Container, Typography, Box } from '@mui/material';

import ProfileCover from './ProfileCover';
import Addresses from './Addresses';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { useEffect, useState, useContext } from 'react';
import { User } from 'src/models/User';
import { UserContext } from 'src/contexts/UserContext';

function ManagementUserProfile() {
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState<User>(currentUser);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <Box display="flex" mb={3}>
          <Box>
            <Typography variant="h3" component="h3" gutterBottom>
              Profile for {currentUser.username}
            </Typography>
          </Box>
        </Box>
      </PageTitleWrapper>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Addresses />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserProfile;
